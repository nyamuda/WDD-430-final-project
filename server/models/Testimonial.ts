import mongoose, { Schema, model } from 'mongoose';

interface ITestimonial {
  content: string;
  userId: object;
  stars: number;
  position: string;
  approved: boolean;
}

let testimonialSchema = new Schema<ITestimonial>(
  {
    content: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    stars: String,
    position: String,
    approved: Boolean,
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
