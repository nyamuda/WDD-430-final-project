import mongoose, { Schema, model } from 'mongoose';

interface ICourse {
  title: string;
  description: string;
  price: number;
  imgUrl: boolean;
  comments: [string];
}

let courseSchema = new Schema<ICourse>(
  {
    title: String,
    description: String,
    price: Number,
    comments: [mongoose.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

let Course = model<ICourse>('Course', courseSchema, 'courses');

export { Course };
