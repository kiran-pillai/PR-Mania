import { Router } from 'express';
import { User } from '../../models/models';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/', async (req, res) => {
  const token: any = req.headers['authorization']?.split(' ')[1];
  const decodedToken: any = jwt.decode(token, { complete: false });
  const { id: userId } = decodedToken;
  try {
    const user = await User.findById(userId).select('friends -_id');
    res.json(user?.friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
  }
});

router.post('/add', async (req, res) => {
  const { friendId } = req.body;
  const token: any = req.headers['authorization']?.split(' ')[1];
  const decodedToken: any = jwt.decode(token, { complete: false });
  const { id: userId } = decodedToken;
  try {
    await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true, safe: true, upsert: false }
    );
  } catch (error) {
    console.error('Error adding friend:', error);
  }
  res.status(200).send('Friend added successfully');
});

export default router;
