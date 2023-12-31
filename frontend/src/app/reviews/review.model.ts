import { MetaData } from '../app.meta';
import { Course } from '../courses/course.model';
import { User } from '../users/user.model';

export class Review {
  private _id: string;
  private _content: string;
  private _userId: User;
  private _courseId: Course;
  private _updatedAt: string;
  private _stars: number;

  constructor() {}

  // Getter and Setter for id
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  // Getter and Setter for content
  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  // Getter and Setter for userId
  get userId(): User {
    return this._userId;
  }

  set userId(value: User) {
    this._userId = value;
  }

  // Getter and Setter for courseId
  get courseId(): Course {
    return this._courseId;
  }

  set courseId(value: Course) {
    this._courseId = value;
  }
  public get updatedAt(): string {
    return this._updatedAt;
  }

  set stars(value: number) {
    this._stars = value;
  }
  public get stars(): number {
    return this._stars;
  }
}

export class ReviewMetaDto {
  constructor(public reviews: Review[], public meta: MetaData) {}
}
