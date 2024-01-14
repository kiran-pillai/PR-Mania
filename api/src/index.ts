import express from 'express';
import { WebSocketServer } from 'ws';
let app = express();

let port = 8000;

app.get('/', (req: any, res: any) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('Hello World 2!');
});

const s = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const wss = new WebSocketServer({ noServer: true });
