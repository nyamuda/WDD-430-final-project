import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from 'src/app/users/user.model';
import { AppService } from 'src/app/app.service';
import { UsersService } from 'src/app/users/users.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailVerificationService {
  userSignal: Signal<User> = computed(() => this.userService.user());

  status: WritableSignal<string> = signal('verifying'); //verification status
  isSendingEmailSignal: WritableSignal<boolean> = signal(false); //verification status

  constructor(
    private appService: AppService,
    private http: HttpClient,
    private userService: UsersService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  emailToVerify(): string {
    let email = localStorage.getItem('emailToVerify');
    if (email) {
      return email;
    }
    return '';
  }

  //send verification email if the user is not verified
  sendVerificationEmail() {
    let userDto = {
      email: this.emailToVerify(),
    };
    this.isSendingEmailSignal.set(true);

    const url = `${this.appService.apiUrl}/email-verification/send`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, userDto, { headers }).subscribe(
      (response) => {
        this.isSendingEmailSignal.set(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //verify user
  verifyUser(userId: string, token: string) {
    this.status.set('verifying');
    let verificationToken = { userId, token };
    const url = `${this.appService.apiUrl}/email-verification/verify`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(url, verificationToken, { headers }).subscribe(
      (response) => {
        this.status.set('success');

        //if the email has been verified
        //save JWT token to local storage
        localStorage.setItem('jwt_token', token);
        this.userService.decodeJwtToken();

        //remove the email from local storage
        localStorage.removeItem('emailToVerify');
      },
      (error) => {
        this.status.set('fail');
      }
    );
  }

  //check if the user has verified their email when they login
  checkUserEmailVerified(token: string): boolean {
    //check to see if the user is verified
    let decodedToken = this.jwtHelper.decodeToken(token);
    let verified: boolean = decodedToken.verified;
    let email = decodedToken.email;
    if (verified) {
      return true;
    }

    return false;
  }
}
