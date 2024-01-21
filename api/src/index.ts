import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { connect } from './middleware/db';
import { User } from './models/users';
import { hash, compare } from 'bcrypt';
let app = express();

let port = 8000;

app.get('/', (req: any, res: any) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('Hello World!');
});

const s = app.listen(port, async () => {
  connect();
  let password = '123abc';
  let queriedPassword = await User.findOne({ username: 'Kiran' });
  // let hashedPassword = await hash(password, 10);
  // let sam = new User({ username: 'Kiran', password: hashedPassword });
  // sam.save().then(() => console.log('Saved!'));
  let isEqual = await compare(password, queriedPassword['password']);
  console.log({ isEqual });

  console.log(`Example app listening on port ${port}`);
});

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
