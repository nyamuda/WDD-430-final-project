export class FAQ {
  private _id: number;
  private _question: string;
  private _answer: string;

  constructor() {}

  get id(): number {
    return this._id;
  }

  set id(value: number) {
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
