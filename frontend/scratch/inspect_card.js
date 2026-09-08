const http = require('http');

async function main() {
  const getJson = (url) => new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const targets = await getJson('http://localhost:9222/json');
  const target = targets.find(t => t.type === 'page');
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  let id = 1;
  const send = (m, p = {}) => new Promise((res, rej) => {
    const i = id++;
    const h = (e) => {
      const r = JSON.parse(e.data);
      if (r.id === i) {
        ws.removeEventListener('message', h);
        if (r.error) rej(r.error);
        else res(r.result);
      }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id: i, method: m, params: p }));
  });

  ws.addEventListener('open', async () => {
    const data = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = Array.from(document.querySelectorAll('*')).find(e => e.textContent.includes('Kickoff Call - Fireflies.ai x Acme') && e.children.length === 0);
          if (!el) return { found: false };
          
          // Get the preview container
          const header = el.closest('header') || el.parentElement.parentElement;
          const root = header.parentElement;
          const rect = root.getBoundingClientRect();
          
          return {
            found: true,
            tagName: root.tagName,
            className: root.className,
            width: rect.width,
            height: rect.height,
            computedStyle: {
              width: window.getComputedStyle(root).width,
              height: window.getComputedStyle(root).height,
              borderRadius: window.getComputedStyle(root).borderRadius,
              boxShadow: window.getComputedStyle(root).boxShadow,
              border: window.getComputedStyle(root).border,
            },
            headerHtml: header.outerHTML,
            rootHtmlSnippet: root.outerHTML.slice(0, 2000)
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Card Analysis:', JSON.stringify(data.result.value, null, 2));
    ws.close();
  });
}

main();
