export class Contact {
    private _name: string;
    private _email: string;
   
    private _phone: string;
    private _message: string;
  
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
  
    // Getter and Setter for Phone
    get phone(): string {
      return this._phone;
    }
    set phone(value: string) {
      this._phone = value;
    }
  
    // Getter and Setter for Service
    get message(): string {
      return this._message;
    }
    set message(value: string) {
      this._message = value;
    }
  }
  