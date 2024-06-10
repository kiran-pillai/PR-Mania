import { Schema, Document } from 'mongoose';
export interface IMessage extends Document {
  chat: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  sender: Schema.Types.ObjectId;
}

export const messageSchema = new Schema<IMessage>({
  chat: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
});
