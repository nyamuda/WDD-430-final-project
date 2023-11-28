import { MetaData } from '../app.meta';

export class Testimonial {
  private _id: string;
  private _name: string;
  private _position: string;
  private _imageUrl: string;
  private _content: string;
  private _rating: number;

  constructor() {}

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get position(): string {
    return this._position;
  }

  set position(value: string) {
    this._position = value;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value;
  }
}

export class TestimonialMetaDto {
  constructor(public testimonials: Testimonial[], public meta: MetaData) {}
}
