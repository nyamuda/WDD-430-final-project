export class CompanyInfo {
  private _id: string;
  private _title: string;
  private _value: number;

  get id(): string {
    return this.id;
  }
  set id(id: string) {
    this._id = id;
  }

  get title(): string {
    return this.title;
  }
  set title(title: string) {
    this._title = title;
  }

  get value(): number {
    return this._value;
  }
  set value(title: number) {
    this._value = title;
  }
}
