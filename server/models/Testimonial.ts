import mongoose, { Schema, model } from 'mongoose';

interface ITestimonial {
  content: string;
  userId: object;
  stars: number;
  position: string;
}

let testimonialSchema = new Schema<ITestimonial>(
  {
    content: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    stars: String,
    position: String,
  },
  {
    timestamps: true,
  }
);

let Testimonial = model<ITestimonial>(
  'Testimonial',
  testimonialSchema,
  'testimonials'
);

export { Testimonial };
