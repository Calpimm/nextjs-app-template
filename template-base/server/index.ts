// server/index.ts

import { createServer } from 'http';
import next from 'next';
import { initWebSocketServer } from './websocket';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

async function start() {
  await app.prepare();
  const server = createServer((req, res) => {
    handle(req, res);
  });

  initWebSocketServer(server);

  const port = process.env.portserver || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Error starting server:', err);
});
