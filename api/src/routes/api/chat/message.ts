import { Router } from 'express';
import { decodeToken } from '../../../utils/utils';
import { Chat, Message, User } from '../../../models/models';

const router = Router();

router.post('/', async (req, res) => {
  const decodedToken = decodeToken(req);
  const { id: userId } = decodedToken;
  const { chat_id, content } = req.body;
  if (!chat_id || !content) {
    console.error('No chat ID provided or content provided');
    return res.status(400).send('Missing required parameter');
  }
  try {
    const chat = await Chat.findById(chat_id);
    if (!chat) {
      return res.status(404).send('Chat not found');
    }
    if (!chat.participants.includes(userId)) {
      return res.status(403).send('Unauthorized');
    }
    const message = await Message.create({
      chat: chat_id,
      sender: userId,
      content,
    });
    return res.status(201).json(message);
  } catch (error) {
    console.error('Error fetching chat:', error);
    return res.status(500).send('Error fetching chat');
  }
});

router.get('/:chatId', async (req, res) => {
  const decodedToken = decodeToken(req);
  const { id: sendingUserId } = decodedToken;
  const { chatId } = req.params;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).send('Chat not found');
    }
    if (!chat.participants.includes(sendingUserId)) {
      return res.status(403).send('Unauthorized');
    }
    let usersPromises: Promise<any>[] = [];
    for (const userId of chat.participants) {
      if (userId?.toString() === sendingUserId) continue;
      let user = User.findById(userId).select('-password -friends');
      usersPromises.push(user);
    }
    let users: any = await Promise.allSettled(usersPromises);
    users = users
      .filter((user: any) => user?.status === 'fulfilled')
      ?.map((user: any) => user?.value);
    const messages = await Message.find({ chat: chatId });
    return res
      .status(200)
      .json({ messages, users, is_group_chat: chat.isGroupChat });
  } catch (error) {
    console.error('Error fetching chat:', error);
    return res.status(500).send('Error fetching chat');
  }
});

export default router;
