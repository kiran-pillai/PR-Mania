import { model } from 'mongoose';
import { Schema, Document } from 'mongoose';
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
}

export const userSchema = new Schema<IUser>({
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
userSchema.index({ name: 'text' });
const User = model<IUser>('User', userSchema);
User.createIndexes()
  .then(() => console.log('Name indexes created'))
  .catch((err: unknown) => console.error('Error creating indexes', err));
