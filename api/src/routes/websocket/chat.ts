import { Server } from 'http';
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

    socket.on('message', async (msg: any, options: any) => {
      const accessToken = socket?.handshake?.auth?.token;
      const message = msg?.message;
      const chat_id = msg?.chat_id;
      io.emit('message', message); // Broadcast to all clients
      await fetch('http://localhost:8000/message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          content: message,
          chat_id,
        }),
      });
      // socket.broadcast.emit('message', msg); // Broadcast to all clients except the sender
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}
