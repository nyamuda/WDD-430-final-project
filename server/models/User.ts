import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

let userSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

let User = model<IUser>('Author', userSchema, 'users');

export { User };
