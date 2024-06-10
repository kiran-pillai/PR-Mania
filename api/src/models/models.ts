import { model } from 'mongoose';
import { userSchema } from '../schemas/user';
import { chatSchema } from '../schemas/chat';
import { messageSchema } from '../schemas/message';

export const User: any = model('User', userSchema);
export const Chat: any = model('Chat', chatSchema);
export const Message: any = model('Message', messageSchema);
