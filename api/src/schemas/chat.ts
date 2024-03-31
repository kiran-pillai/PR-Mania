import { Schema, Document } from 'mongoose';
export interface IChat extends Document {
  email: string;
  password: string;
  name: string;
}

export const chatSchema = new Schema<IChat>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  },
  password: { type: String, required: true, minlength: 6 },
});
