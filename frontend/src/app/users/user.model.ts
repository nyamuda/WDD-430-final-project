export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _isAdmin: boolean;
  private _imageUrl: string;
  private _verified: boolean;

  constructor() {
    // Initialize any default values or perform other operations
  }

  // Getter and Setter for id
  get id(): string {
    return this._id;
  }

  set id(value: string) {
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

  // Getter and Setter for isAdmin
  get isAdmin(): boolean {
    return this._isAdmin;
  }

  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

  // Getter and Setter for imageUrl
  get imageUrl(): string {
    return this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  // Getter and Setter for verified
  get verified(): boolean {
    return this._verified;
  }

  set verified(value: boolean) {
    this._verified = value;
  }
}
