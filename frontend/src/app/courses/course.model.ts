import { Review } from '../reviews/review.model';
export class Course {
  private _id: string;
  private _title: string;
  private _fullDescription: string;
  private _shortDescription: string;
  private _price: number;
  private _imageUrl: string;
  private _reviews: Array<Review> = new Array<Review>();
  private _updatedAt: string;
  private _rating: number;

  constructor() {}

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get fullDescription(): string {
    return this._fullDescription;
  }

  public set fullDescription(description: string) {
    this._fullDescription = description;
  }

  public get shortDescription(): string {
    return this._shortDescription;
  }

  public set shortDescription(description: string) {
    this._shortDescription = description;
  }

  public get price(): number {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }

  public set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  public get reviews(): Array<Review> {
    return this._reviews;
  }

  public set reviews(reviews: Array<Review>) {
    this._reviews = reviews;
  }

  public get updatedAt(): string {
    return this._updatedAt;
  }

  public get rating(): number {
    return this._rating;
  }
}
