import { model } from 'mongoose';
import { userSchema } from '../schemas/user';

export const User: any = model('User', userSchema);
