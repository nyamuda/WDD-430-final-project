import { Schema, model } from 'mongoose';

interface IGallery {
  url: string;
  type: string;
}

let userSchema = new Schema<IGallery>(
  {
    url: String,

    type: String,
  },
  {
    timestamps: true,
  }
);

let Gallery = model<IGallery>('Gallery', userSchema, 'gallery');

export { Gallery };
