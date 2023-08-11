import mongoose, { Schema, model } from 'mongoose';

interface IReview {
  content: string;
  userId: object;
  courseId: object;
  stars: number;
}

let reviewSchema = new Schema<IReview>(
  {
    content: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    courseId: { type: mongoose.Types.ObjectId, ref: 'Course' },
    stars: Number,
  },
  {
    timestamps: true,
  }
);

let Review = model<IReview>('Review', reviewSchema, 'reviews');

export { Review };
