import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { requireAuthSocket } from '../../middleware/requireAuth';
import { Server as ServerIO } from 'socket.io';

export function openWSA(s: Server) {
  const io = new ServerIO(s, {
    cors: {
      origin: '*', // Adjust according to your needs for security
    },
  });

  io.use((socket: any, next: any) => {
    const token = socket?.handshake?.auth?.token;
    try {
      requireAuthSocket(token);
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: any) => {
    console.log('A user connected SOCKET.IO');

    socket.on('error', (err: any) => console.error('Socket.IO Error', err));

    socket.on('message', (msg: any) => {
      console.log('received message', msg);
      io.emit('message', msg); // Broadcast to all clients
      // socket.broadcast.emit('message', msg); // Broadcast to all clients except the sender
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

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
