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

  const targets = await getJson('http://localhost:9222/json').catch(() => null);
  let webSocketDebuggerUrl = targets ? targets.find(t => t.type === 'page' && t.url.includes('localhost:3000'))?.webSocketDebuggerUrl : null;

  if (!webSocketDebuggerUrl) {
    console.error('No page target found on localhost:9222');
    process.exit(1);
  }

  const ws = new WebSocket(webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const msgId = id++;
    const handler = (event) => {
      const res = JSON.parse(event.data);
      if (res.id === msgId) {
        ws.removeEventListener('message', handler);
        if (res.error) reject(res.error);
        else resolve(res.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  ws.addEventListener('open', async () => {
    try {
      await send('Page.enable');

      // Navigate to /meetings/29 to ensure fresh state
      await send('Page.navigate', { url: 'http://localhost:3000/meetings/29' });
      await new Promise(r => setTimeout(r, 2000));

      // Capture AskFred default view
      const screenshot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('/Users/khushi/.gemini/antigravity-ide/brain/d4c92ed3-b773-424a-a832-2b2ff07b46be/meeting_detail_askfred_exact.png', Buffer.from(screenshot1.data, 'base64'));
      console.log('Saved meeting_detail_askfred_exact.png');

      // Switch to Transcript Tab
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Transcript'));
            if (btns.length > 0) btns[0].click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 600));

      // Capture Transcript view
      const screenshot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('/Users/khushi/.gemini/antigravity-ide/brain/d4c92ed3-b773-424a-a832-2b2ff07b46be/meeting_detail_transcript_exact.png', Buffer.from(screenshot2.data, 'base64'));
      console.log('Saved meeting_detail_transcript_exact.png');

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
