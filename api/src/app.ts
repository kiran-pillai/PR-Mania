import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { connectToMongo } from './middleware/db';
import routes from './routes/index';
import cors from 'cors';
import dotenv from 'dotenv';
import { requireAuth } from './middleware/requireAuth';

dotenv.config();
let app = express();
let port = 8000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use('/', routes);
app.get('/', requireAuth, (req: any, res: any) => {
  res.send('Hello World!');
});

connectToMongo();

const s = app.listen(port, async () => {});
app.use('/', routes);

const wss = new WebSocketServer({ noServer: true });

s.on('upgrade', (req, socket, head) => {
  socket.on('error', (err) => console.error('preupgrade ERROR', err));
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

wss.on('connection', (ws, req) => {
  ws.on('error', (err) => console.error('POST UPGRADE ERROR', err));
  ws.on('message', (msg, isBinary) => {
    console.log('received message', msg?.toString());
    wss.clients.forEach((client) => {
      //ws!==client -> don't send to person who sent
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg, { binary: isBinary });
      }
    });
  });
});

wss.on('close', () => console.log('Connection closed'));
