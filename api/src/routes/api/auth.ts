import { Router } from 'express';
import { User } from '../../models/models';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = Router();

router.get('/', (req, res) => {
  res.send('AUTH');
});

router.post('/register', async (req, res) => {
  let formData = req.body;
  try {
    let password = formData.password;
    let hashedPassword = await hash(password, 10);
    let user = new User({ ...formData, password: hashedPassword });
    await user.save();
    return res.status(201).send('User registered successfully');
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'ValidationError') {
      return res.status(400).send(err.message);
    }
    console.error('ERROR', err);
    return res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password }: any = req.body;
  let user = await User.findOne({ email });
  try {
    if (!user) {
      return res.status(400).send("User doesn't exist");
    }
    let isMatch = password === user['password'];
    if (!isMatch) {
      return res.status(400).send('Invalid Password');
    }
    const secret: any = process.env.SECRET_KEY;
    const accessToken = jwt.sign({ email, name: user.name }, secret, {
      expiresIn: 5,
    });
    const refreshToken = jwt.sign({ email, name: user.name }, secret, {
      expiresIn: '20d',
    });
    return res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/logout', (req, res) => {
  return res.status(200).send('Logged out');
});

router.post('/refresh', (req, res) => {
  let refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.status(401).send('No token');
  const secret: any = process.env.SECRET_KEY;
  let decoded: any;
  try {
    decoded = jwt.verify(refreshToken, secret);
  } catch (err: unknown) {
    console.error('error with decoding payload', err);
    return res.status(500).send('Internal Server Error');
  }
  let accessToken = jwt.sign(
    { email: decoded?.email, name: decoded?.name },
    secret,
    { expiresIn: 5 }
  );
  return res.status(200).send({ accessToken });
});

export default router;
