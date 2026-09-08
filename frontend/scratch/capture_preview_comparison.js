const http = require('http');
const fs = require('fs');

async function main() {
  const getJson = (url) => new Promise(res => {
    http.get(url, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
    });
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
    await send('Page.enable');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll down to center the ProductPreview card in the viewport
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 380, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 600));

    const s = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/khushi/.gemini/antigravity-ide/brain/d4c92ed3-b773-424a-a832-2b2ff07b46be/preview_exact_comparison.png', Buffer.from(s.data, 'base64'));
    console.log('Saved preview_exact_comparison.png');
    ws.close();
  });
}

main();
