const http = require('http');
const fs = require('fs');

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
  const send = (m, p = {}) => new Promise((resolve, reject) => {
    const msgId = id++;
    const handler = (e) => {
      const res = JSON.parse(e.data);
      if (res.id === msgId) {
        ws.removeEventListener('message', handler);
        if (res.error) reject(res.error);
        else resolve(res.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method: m, params: p }));
  });

  ws.addEventListener('open', async () => {
    try {
      await send('Page.enable');
      console.log('Navigating to fireflies.ai...');
      await send('Page.navigate', { url: 'https://fireflies.ai' });
      await new Promise(r => setTimeout(r, 4000));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('/Users/khushi/.gemini/antigravity-ide/brain/d4c92ed3-b773-424a-a832-2b2ff07b46be/real_fireflies_landing.png', Buffer.from(screenshot.data, 'base64'));
      console.log('Saved real_fireflies_landing.png');

      const info = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const header = document.querySelector('header');
            const hero = document.querySelector('.hero-section_root__cx4OQ') || document.querySelector('section');
            const heroBg = document.querySelector('.hero-section_bg__MmOjE') || document.querySelector('[class*="hero"][class*="bg"]');
            
            return {
              headerClasses: header?.className,
              headerBg: header ? window.getComputedStyle(header).backgroundColor : null,
              headerColor: header ? window.getComputedStyle(header).color : null,
              heroBgHtml: heroBg ? heroBg.outerHTML.slice(0, 1000) : null,
              heroBgStyle: heroBg ? window.getComputedStyle(heroBg).background : null,
              allSVGsInHeroBg: heroBg ? Array.from(heroBg.querySelectorAll('svg')).map(s => s.outerHTML.slice(0, 200)) : [],
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Page info:', JSON.stringify(info.result.value, null, 2));

      // Now scroll down 600px and inspect header
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, 600)` });
      await new Promise(r => setTimeout(r, 1000));

      const scrollInfo = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const header = document.querySelector('header');
            return {
              headerClassesScrolled: header?.className,
              headerBgScrolled: header ? window.getComputedStyle(header).backgroundColor : null,
              headerColorScrolled: header ? window.getComputedStyle(header).color : null,
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Scrolled info:', JSON.stringify(scrollInfo.result.value, null, 2));

      const screenshot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('/Users/khushi/.gemini/antigravity-ide/brain/d4c92ed3-b773-424a-a832-2b2ff07b46be/real_fireflies_scrolled.png', Buffer.from(screenshot2.data, 'base64'));

      ws.close();
      process.exit(0);
    } catch (e) {
      console.error(e);
      ws.close();
      process.exit(1);
    }
  });
}

main();
