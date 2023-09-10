export class Booking {
  private _name: string;
  private _email: string;
  private _date: string;
  private _time: string;
  private _address: string;
  private _phone: string;
  private _service: string;

  constructor() {}

  // Getter and Setter for Name
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  // Getter and Setter for Email
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  // Getter and Setter for Date
  get date(): string {
    return this._date;
  }
  set date(value: string) {
    this._date = value;
  }

  // Getter and Setter for Time
  get time(): string {
    return this._time;
  }
  set time(value: string) {
    this._time = value;
  }

  // Getter and Setter for Address
  get address(): string {
    return this._address;
  }
  set address(value: string) {
    this._address = value;
  }

  // Getter and Setter for Phone
  get phone(): string {
    return this._phone;
  }
  set phone(value: string) {
    this._phone = value;
  }

  // Getter and Setter for Service
  get service(): string {
    return this._service;
  }
  set service(value: string) {
    this._service = value;
  }
}
