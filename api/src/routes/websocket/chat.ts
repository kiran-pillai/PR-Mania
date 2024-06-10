import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { requireAuthSocket } from '../../middleware/requireAuth';

export function openWS(s: Server) {
  const wss = new WebSocketServer({ noServer: true });

  s.on('upgrade', (req: any, socket, head) => {
    let token = decodeURIComponent(req.url?.split('=')?.[1])?.split(' ')[1];
    requireAuthSocket(token);
    socket.on('error', (err) => console.error('preupgrade ERROR', err));
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });

  wss.on('connection', (ws, req) => {
    ws.on('error', (err) => console.error('POST UPGRADE ERROR', err));
    ws.on('message', (msg, isBinary) => {
      wss.clients.forEach((client) => {
        //ws!==client -> don't send to person who sent
        if (client.readyState === WebSocket.OPEN) {
          console.log('received message', msg?.toString());
          client.send(msg, { binary: isBinary });
        }
      });
    });
  });

  wss.on('close', () => console.log('Connection closed'));
}
