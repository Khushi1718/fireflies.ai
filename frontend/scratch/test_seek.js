const http = require('http');

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

  if (!webSocketDebuggerUrl) process.exit(1);

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

      // Click on (00:44) timestamp in Notes
      const result = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const timeBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('(00:44)'));
            if (timeBtns.length > 0) {
              timeBtns[0].click();
              return 'clicked (00:44)';
            }
            return 'not found';
          })()
        `,
        returnByValue: true
      });
      console.log('Result of clicking note timestamp:', result.result.value);

      await new Promise(r => setTimeout(r, 600));

      // Read time display in bottom player
      const timeDisplay = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const timeSpan = document.querySelector('.h-12 span.font-semibold');
            return timeSpan ? timeSpan.textContent : 'none';
          })()
        `,
        returnByValue: true
      });
      console.log('Player current time after click:', timeDisplay.result.value);

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
