export class Password {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  // Getter for the password value
  get value(): string {
    return this._value;
  }

  // Setter for the password value
  set value(newValue: string) {
    // You can add validation logic here if needed
    this._value = newValue;
  }
}
