import { Router } from 'express';
import { Chat, User } from '../../../models/models';
import { decodeToken } from '../../../utils/utils';

const router = Router();

router.post('/', async (req, res) => {
  let userIds = req?.body?.users;
  let isGroupChat = req?.body?.users?.length > 1;
  const decodedToken = decodeToken(req);
  const { id: userId } = decodedToken;
  if (!userIds?.length) {
    return res.status(400).send('No users provided');
  }
  let usersList = [userId];
  for (const userId of userIds) {
    const user = await User.findById(userId).select('id');
    if (!user) return res.status(404).send(`User not found ${userId}`);
    usersList.push(user);
  }
  try {
    const chat = await Chat.create({ participants: usersList, isGroupChat });
    return res.status(201).json(chat);
  } catch (err) {
    return res.status(500).send(`Error creating chat ${err}`);
  }
});
