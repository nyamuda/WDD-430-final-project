import { MetaData } from '../app.meta';
import { User } from '../users/user.model';

export class Testimonial {
  private _id: string;
  private _userId: User;
  private _position: string;
  private _content: string;
  private _stars: number;
  private _updatedAt: string;

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

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get stars(): number {
    return this._stars;
  }

  set stars(value: number) {
    this._stars = value;
  }
  public get updatedAt(): string {
    return this._updatedAt;
  }
}

export class TestimonialMetaDto {
  constructor(public testimonials: Testimonial[], public meta: MetaData) {}
}
