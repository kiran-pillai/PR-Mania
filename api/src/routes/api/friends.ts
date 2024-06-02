import { Router } from 'express';
import { User } from '../../models/models';
import jwt from 'jsonwebtoken';
import { decodeToken } from '../../utils/utils';

const router = Router();

router.get('/list', async (req, res) => {
  const token: any = req.headers['authorization']?.split(' ')[1];
  const decodedToken: any = jwt.decode(token, { complete: false });
  const { id: userId } = decodedToken;
  if (!userId) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  try {
    const user = await User.findById(userId).select('friends -_id');
    res.json(user);
  } catch (error) {
    console.error('Error fetching friends:', error);
  }
});

router.get('/list_ids', async (req, res) => {
  const token: any = req.headers['authorization']?.split(' ')[1];
  const decodedToken: any = jwt.decode(token, { complete: false });
  const { id: userId } = decodedToken;
  if (!userId) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  try {
    const user = await User.findById(userId).select('friends -_id');
    let hashMap = {};
    if (user?.friends?.length) {
      hashMap = user?.friends.reduce(
        (acc: any, curr: any) => ({ ...acc, [curr]: true }),
        {}
      );
    }
    res.json(hashMap);
  } catch (error) {
    console.error('Error fetching friends:', error);
  }
});

router.post('/search', async (req, res) => {
  const decodedToken = decodeToken(req);
  const { id: userId } = decodedToken;
  const searchQuery = req.body.search_query;
  if (!searchQuery) {
    return res.status(400).send('No search query provided');
  }

  try {
    // Perform a case-insensitive partial search
    let user = await User.findById(userId).select('friends');
    const friendsIds = user.friends.map((friends: any) => friends.toString());
    let friends = await User.find({
      _id: { $in: friendsIds },
      name: { $regex: searchQuery, $options: 'i' },
    }).select('-password');
    res.json(friends);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send('Error performing search');
  }
});

router.post('/add', async (req, res) => {
  const { friendId } = req.body;
  const decodedToken = decodeToken(req);
  const { id: userId } = decodedToken;
  if (!userId || !friendId) {
    return res.status(404).json({ message: 'User not found' });
  }
  try {
    // Update the current user's friend list
    const userUpdate = User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // Use $addToSet to prevent duplicate entries
      { new: true, safe: true, upsert: false }
    );

    // Update the friend's friend list to include the current user
    const friendUpdate = User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: userId } }, // Also prevent duplicates here
      { new: true, safe: true, upsert: false }
    );

    // Execute both updates concurrently
    await Promise.all([userUpdate, friendUpdate]);

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Error performing friend update' });
  }
});

router.delete('/remove', async (req, res) => {
  const { friendId } = req.body;
  const decodedToken = decodeToken(req);
  const { id: userId } = decodedToken;
  if (!userId || !friendId) {
    return res.status(404).json({ message: 'User not found' });
  }
  try {
    // Update the current user's friend list
    const userUpdate = User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } }, // Use $addToSet to prevent duplicate entries
      { new: true, safe: true, upsert: false }
    );

    // Update the friend's friend list to include the current user
    const friendUpdate = User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: userId } }, // Also prevent duplicates here
      { new: true, safe: true, upsert: false }
    );

    // Execute both updates concurrently
    await Promise.all([userUpdate, friendUpdate]);

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Error performing friend update' });
  }
});

export default router;
