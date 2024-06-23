import { Router } from 'express';
import { decodeToken } from '../../../utils/utils';
import { Chat, Message } from '../../../models/models';

const router = Router();

router.post('/', async (req, res) => {
  const decodedToken = decodeToken(req);
  const { id: userId } = decodedToken;
  const { chatId, content } = req.body;
  if (!chatId) {
    return res.status(400).send('No chat ID provided');
  }
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).send('Chat not found');
    }
    if (!chat.participants.includes(userId)) {
      return res.status(403).send('Unauthorized');
    }
    const message = await Message.create({
      chat: chatId,
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
  const { id: userId } = decodedToken;
  const { chatId } = req.params;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).send('Chat not found');
    }
    if (!chat.participants.includes(userId)) {
      return res.status(403).send('Unauthorized');
    }
    const messages = await Message.find({ chat: chatId });
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat:', error);
    return res.status(500).send('Error fetching chat');
  }
});

export default router;
