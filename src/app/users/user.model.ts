export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor() {
    // Initialize any default values or perform other operations
  }

  // Getter and Setter for id
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  // Getter and Setter for name
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  // Getter and Setter for email
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  // Getter and Setter for password
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
