import { Router } from 'express';
import { User } from '../../models/models';
import { compare, hash } from 'bcrypt';

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
    res.status(201).send('User registered successfully');
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'ValidationError') {
      return res.status(400).send(err.message);
    }
    res.status(500).send('Internal Server Error');
    console.error('ERROR', err);
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
    res.status(200).send('Login Successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
export default router;
