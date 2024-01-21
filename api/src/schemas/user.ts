import { Schema } from 'mongoose';

export const userSchema: any = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
