import mongoose, { Schema, model } from 'mongoose';

interface ICourse {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  reviews: [object];
  rating: number;
}

let courseSchema = new Schema<ICourse>(
  {
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
    rating: Number,
  },
  {
    timestamps: true,
  }
);

let Course = model<ICourse>('Course', courseSchema, 'courses');

export { Course };
