import mongoose, { Schema, model } from 'mongoose';

interface IComment {
  content: string;
  userId: object;
  courseId: object;
}

let commentSchema = new Schema<IComment>(
  {
    content: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    courseId: { type: mongoose.Types.ObjectId, ref: 'Course' },
  },
  {
    timestamps: true,
  }
);

let Comment = model<IComment>('Comment', commentSchema, 'comments');

export { Comment };
