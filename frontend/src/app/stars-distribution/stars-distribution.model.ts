export class StarsDistribution {
  private _one: number;
  private _two: number;
  private _three: number;
  private _four: number;
  private _five: number;
  private _total: number;

  constructor() {
    this._one = 2;
    this._two = 1;
    this._three = 4;
    this._four = 5;
    this._five = 8;
    this._total = 20;
  }

  // Getter and Setter for _one
  get one(): number {
    return this._one;
  }

  set one(value: number) {
    this._one = value;
  }

  // Getter and Setter for _two
  get two(): number {
    return this._two;
  }

  set two(value: number) {
    this._two = value;
  }

  // Getter and Setter for _three
  get three(): number {
    return this._three;
  }

  set three(value: number) {
    this._three = value;
  }

  // Getter and Setter for _four
  get four(): number {
    return this._four;
  }

  set four(value: number) {
    this._four = value;
  }

  // Getter and Setter for _five
  get five(): number {
    return this._five;
  }

  set five(value: number) {
    this._five = value;
  }

  // Getter and Setter for _total
  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }
}
