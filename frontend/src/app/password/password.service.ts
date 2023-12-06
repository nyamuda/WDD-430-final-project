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
  isResettingPasswordSignal: WritableSignal<boolean> = signal(false);
  resetResultSignal: WritableSignal<string> = signal('fail'); //reset status

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
        this.router.navigateByUrl('/password/email');
      },
      (error) => {
        this.isSendingEmailSignal.set(false);

        //show toast
        let errorMessage = error['error']['message']
          ? error['error']['message']
          : error['error']['error']
          ? error['error']['error']
          : 'Please check your email and try again.';

        this.appService.showFailureToast(errorMessage, 'Request failed');
      }
    );
  }

  //reset password
  resetPassword(password: Password, token: string, userId: string) {
    this.isResettingPasswordSignal.set(true);
    let passwordDto = { password, token, userId };
    const url = `${this.appService.apiUrl}/password/reset`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(url, passwordDto, { headers }).subscribe(
      (response) => {
        this.isResettingPasswordSignal.set(false);
        this.resetResultSignal.set('success');
        this.router.navigateByUrl('/password/result');
      },
      (error) => {
        this.router.navigateByUrl('/password/result');
        this.resetResultSignal.set('fail');
        this.isResettingPasswordSignal.set(false);
      }
    );
  }
}
