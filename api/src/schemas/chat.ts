import { Schema, Document } from 'mongoose';
export interface IChat extends Document {
  participants: Schema.Types.ObjectId[];
  isGroupChat: boolean;
  createdAt: Date;
  chatName?: string;
}

export const chatSchema = new Schema<IChat>({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  chatName: { type: String },
  isGroupChat: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
