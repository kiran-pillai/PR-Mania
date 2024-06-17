import express from 'express';
import { connectToMongo } from './middleware/db';
import routes from './routes/index';
import cors from 'cors';
import dotenv from 'dotenv';
import { requireAuth } from './middleware/requireAuth';
import { openWSA } from './routes/websocket/chat';

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
openWSA(s);
