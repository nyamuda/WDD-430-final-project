import { string } from 'joi';
import mongoose, { Schema, model } from 'mongoose';

interface IFaq {
  question: string;
  answer: string;
}

let faqSchema = new Schema<IFaq>(
  {
    question: String,
    answer: String,
  },
  {
    timestamps: true,
  }
);

let FAQ = model<IFaq>('FAQ', faqSchema, 'faq');

export { FAQ };
