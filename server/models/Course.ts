import mongoose, { Schema, model } from 'mongoose';

interface ICourse {
  title: string;
  description: string;
  price: number;
  imgUrl: boolean;
  comments: [object];
}

let courseSchema = new Schema<ICourse>(
  {
    title: String,
    description: String,
    price: Number,
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

let Course = model<ICourse>('Course', courseSchema, 'courses');

export { Course };
