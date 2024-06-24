import { Router } from 'express';
import { Chat, User } from '../../../models/models';
import { decodeToken } from '../../../utils/utils';

const router = Router();

const validateUsers = async (
  sendingUserId: string,
  userIds: string[],
  res: any
) => {
  let usersList = [sendingUserId];
  for (const userId of userIds) {
    const user = await User.findById(userId).select('id');
    if (!user) return res.status(404).send(`User not found ${userId}`);
    usersList.push(user);
  }
  return usersList;
};

router.get('/:chat_id', async (req, res) => {
  let { chat_id } = req.params;
  const { id: sendingUserId } = decodeToken(req);
  if (!chat_id) {
    return res.status(400).send('No chat ID provided');
  }
  try {
    let chat = await Chat.findById(chat_id);
    if (!chat) {
      return res.status(404).send('Chat not found');
    }

    let users: any[] = [];
    for (const userId of chat.participants) {
      if (userId?.toString() === sendingUserId) continue;
      let user = await User.findById(userId);
      users.push(user);
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching chat:', error);
  }
});

router.post('/', async (req, res) => {
  let userIds = req?.body?.users;
  let isGroupChat = req?.body?.users?.length > 1;
  const decodedToken = decodeToken(req);
  const { id: sendingUserId } = decodedToken;
  if (!userIds?.length) {
    return res.status(400).send('No users provided');
  }

  try {
    const usersList = await validateUsers(sendingUserId, userIds, res);
    const chat = await Chat.create({ participants: usersList, isGroupChat });
    return res.status(201).json(chat);
  } catch (err) {
    return res.status(500).send(`Error creating chat ${err}`);
  }
});

router.post('/check_exists', async (req, res) => {
  let userIds: string[] = req?.body?.users;
  const decodedToken = decodeToken(req);
  const { id: sendingUserId } = decodedToken;
  if (!userIds?.length) {
    return res.status(400).send('No users provided');
  }
  try {
    const usersList = await validateUsers(sendingUserId, userIds, res);
    const chat = await Chat.findOne({ participants: { $all: usersList } });
    if (!chat) {
      return res.status(404).send('Chat not found');
    }
    return res.status(200).json(chat);
  } catch (err) {
    return res.status(500).send(`Error fetching chat ${err}`);
  }
});

export default router;
