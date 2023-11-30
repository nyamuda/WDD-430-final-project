import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  imageUrl: string;
  token: string;
  verified: boolean;
}

let userSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean },
    imageUrl: String,
    token: String,
    verified: Boolean,
  },
  {
    timestamps: true,
  }
);

let User = model<IUser>('User', userSchema, 'users');

export { User };
