import { Injectable, WritableSignal, signal } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Password } from './password.model';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  isSendingEmailSignal: WritableSignal<boolean> = signal(false);
  status: WritableSignal<string> = signal('verifying'); //reset status

  constructor(
    private appService: AppService,
    private http: HttpClient,
    private userService: UsersService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  //send verification email if the user is not verified
  sendPasswordResetEmail(email: string) {
    let emailDto = {
      email,
    };
    this.isSendingEmailSignal.set(true);

    const url = `${this.appService.apiUrl}/password/forgot`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, emailDto, { headers }).subscribe(
      (response) => {
        this.isSendingEmailSignal.set(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //reset password
  resetPassword(password: Password, token: string) {
    this.status.set('resetting');
    let passwordDto = { password, token };
    const url = `${this.appService.apiUrl}/password/reset`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(url, passwordDto, { headers }).subscribe(
      (response) => {
        this.status.set('success');
      },
      (error) => {
        this.status.set('fail');
      }
    );
  }
}
