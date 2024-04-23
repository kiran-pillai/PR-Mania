import { Router } from 'express';
import { User } from '../../models/models';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../../middleware/requireAuth';
const router = Router();

const getTokens = (email: string, name: string, id: string) => {
  const secret = process.env.SECRET_KEY as string;
  const accessToken = jwt.sign({ email, name: name, id }, secret, {
    expiresIn: '1h',
  });
  const refreshToken = jwt.sign({ email, name, id }, secret, {
    expiresIn: '20d',
  });
  return { accessToken, refreshToken };
};

router.get('/', requireAuth, (req, res) => {
  res.send(200);
});

router.post('/register', async (req, res) => {
  let formData = req.body;
  try {
    let password = formData.password;
    let hashedPassword = await hash(password, 10);
    let user = new User({ ...formData, password: hashedPassword });
    await user.save();
    const { accessToken, refreshToken } = getTokens(
      user?.email,
      user?.name,
      user?.id
    );
    return res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
    });
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
    let isMatch = await compare(password, user['password']);
    if (!isMatch) {
      return res.status(400).send('Invalid Password');
    }
    const { accessToken, refreshToken } = getTokens(email, user.name, user._id);
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
    { email: decoded?.email, name: decoded?.name, id: decoded?.id },
    secret,
    { expiresIn: '1h' }
  );
  return res.status(200).send({ accessToken });
});

export default router;
