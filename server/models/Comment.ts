import mongoose, { Schema, model } from 'mongoose';

interface IComment {
  content: string;
  userId: string;
}

let commentSchema = new Schema<IComment>(
  {
    content: String,
    userId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

let Comment = model<IComment>('Comment', commentSchema, 'comments');

export { Comment };
