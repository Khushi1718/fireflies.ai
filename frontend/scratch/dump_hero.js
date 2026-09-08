const http = require('http');
const fs = require('fs');

async function main() {
  const getJson = (url) => new Promise(res => {
    http.get(url, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
    });
  });
  const targets = await getJson('http://localhost:9222/json');
  const target = targets.find(t => t.url.includes('fireflies.ai'));
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  let id = 1;
  const send = (m, p = {}) => new Promise((res, rej) => {
    const i = id++;
    const h = (e) => {
      const r = JSON.parse(e.data);
      if (r.id === i) { ws.removeEventListener('message', h); if (r.error) rej(r.error); else res(r.result); }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id: i, method: m, params: p }));
  });

  ws.addEventListener('open', async () => {
    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const hero = document.querySelector('.hero-section_root__cx4OQ');
          // Find all elements inside hero with class containing visual or rating
          const nodes = Array.from(hero.querySelectorAll('*')).filter(el => 
            el.className && typeof el.className === 'string' && (el.className.includes('visual') || el.className.includes('card') || el.className.includes('interactive') || el.className.includes('appMockup'))
          );
          return {
            nodes: nodes.map(n => ({
              tag: n.tagName,
              className: n.className,
              rect: n.getBoundingClientRect(),
              html: n.outerHTML.slice(0, 1000)
            })),
            heroFullHtml: hero.outerHTML
          };
        })()
      `,
      returnByValue: true
    });

    const val = evalRes.result.value;
    fs.writeFileSync('/Users/khushi/.gemini/antigravity-ide/brain/d4c92ed3-b773-424a-a832-2b2ff07b46be/scratch/hero_full.html', val.heroFullHtml);
    console.log('Saved hero_full.html, length:', val.heroFullHtml.length);
    ws.close();
  });
}

main();
