import { MetaData } from '../app.meta';
import { User } from '../users/user.model';

export class Testimonial {
  private _id: string;
  private _userId: User;
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

  get userId(): User {
    return this._userId;
  }

  set userId(value: User) {
    this._userId = value;
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
