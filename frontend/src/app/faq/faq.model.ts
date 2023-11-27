export class FAQ {
  private _id: string;
  private _question: string;
  private _answer: string;

  constructor() {}

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get question(): string {
    return this._question;
  }

  set question(value: string) {
    this._question = value;
  }

  get answer(): string {
    return this._answer;
  }

  set answer(value: string) {
    this._answer = value;
  }
}
