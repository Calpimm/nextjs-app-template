import { WebSocketServer, WebSocket } from 'ws';

/**
 * Initializes a simple WebSocket server on the given HTTP server.
 * @param server The Node.js HTTP server to attach the WebSocket server to.
 */
export function initWebSocketServer(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected!');

    // Send a welcome message to the client
    ws.send('Hello from the WebSocket server!');

    // Echo any message back to the client
    ws.on('message', (message: string) => {
      console.log(`Received message: ${message}`);
      ws.send(`Server echo: ${message}`);
    });

    // Handle closing
    ws.on('close', () => {
      console.log('Client disconnected.');
    });
  });
}
