import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { User } from '../users/user.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { AppService } from '../app.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EmailVerificationService } from '../email/email-verification/email-verification.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggingIn: WritableSignal<boolean> = signal(false); // show loading button;
  rememberMe: WritableSignal<boolean> = signal(false); // remember me on log in
  //redirect URL if log in is a success
  //default is the homepage
  redirectUrl: Signal<string> = computed(() => this.appService.redirectUrl());

  constructor(
    private http: HttpClient,

    private router: Router,

    private userService: UsersService,
    private appService: AppService,
    private jwtHelper: JwtHelperService,
    private emailVerificationService: EmailVerificationService
  ) {}

  login(newUser: User) {
    this.isLoggingIn.set(true);

    let userDto = {
      email: newUser.email.trim(),
      password: newUser.password.trim(),
    };
    const url = `${this.appService.apiUrl}/login`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, userDto, { headers }).subscribe(
      (response) => {
        //disable loading button
        this.isLoggingIn.set(false);
        //get access token
        let accessToken = response['token'];
        //check if user email is verified before storing the token
        let isUserVerified: boolean = this.userService.isVerified(accessToken);

        //user verified
        //save the access token to local/session storage
        if (isUserVerified) {
          //if the user wants to be be remembered on log in
          //save the JWT token to local storage
          if (this.rememberMe) {
            localStorage.setItem('jwt_token', accessToken);
          }
          //else save the JWT token to session storage
          else {
            sessionStorage.setItem('jwt_token', accessToken);
          }

          //load the user information to the user service
          //by decoding the access token
          this.userService.decodeJwtToken();

          this.appService.showSuccessToast('Login successful!', '');

          //navigate the user
          this.router.navigateByUrl(this.redirectUrl());
        }

        //user not verified
        //send verification email
        //navigate the user to the email verification page
        else {
          //the email that needs to be verified
          let emailToVerify = userDto.email;
          //save the email to local storage
          localStorage.setItem('emailToVerify', emailToVerify);
          this.emailVerificationService.sendVerificationEmail();
          this.router.navigateByUrl('email-verification');
        }
      },
      (error) => {
        //disable loading button
        this.isLoggingIn.set(false);

        //show toast
        let errorMessage = error['error']['message']
          ? error['error']['message']
          : error['error']['error']
          ? error['error']['error']
          : 'Please review your login credentials and try again.';

        this.appService.showFailureToast(errorMessage, 'Login failed');
      }
    );
  }

  // When the user logs out
  logout() {
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_token');
    //clear the stored information about the user
    this.userService.user.set(new User());
    this.appService.showSuccessToast("You've been logged out", '');
    this.router.navigateByUrl('/home');
  }
}
