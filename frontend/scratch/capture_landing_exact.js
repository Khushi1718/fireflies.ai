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

      // Navigate to localhost:3000
      await send('Page.navigate', { url: 'http://localhost:3000' });
      await new Promise(r => setTimeout(r, 2500));

      // Dismiss cookie banner in browser if visible
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Accept all cookies'));
            if (btn) btn.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 500));

      // Capture top hero view
      const screenshot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('/Users/khushi/.gemini/antigravity-ide/brain/d4c92ed3-b773-424a-a832-2b2ff07b46be/landing_hero_exact.png', Buffer.from(screenshot1.data, 'base64'));
      console.log('Saved landing_hero_exact.png');

      // Scroll down to test white navbar
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: 450, behavior: 'instant' })`
      });
      await new Promise(r => setTimeout(r, 600));

      // Capture scrolled view with white navbar
      const screenshot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('/Users/khushi/.gemini/antigravity-ide/brain/d4c92ed3-b773-424a-a832-2b2ff07b46be/landing_scrolled_white_navbar.png', Buffer.from(screenshot2.data, 'base64'));
      console.log('Saved landing_scrolled_white_navbar.png');

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
