import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../users/user.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggingIn: WritableSignal<boolean> = signal(false); // show loading button;
  rememberMe: WritableSignal<boolean> = signal(false); // remember me on log in
  //redirect URL if log in is a success
  //default is the homepage
  redirectUrl: WritableSignal<string> = signal('');

  constructor(
    private http: HttpClient,

    private router: Router,

    private userService: UsersService,
    private appService: AppService
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
        //if the user wants to be be remembered on log in
        //save the JWT token to local storage
        if (this.rememberMe) {
          localStorage.setItem('jwt_token', response['token']);
        }
        //else save the JWT token to session storage
        else {
          sessionStorage.setItem('jwt_token', response['token']);
        }

        //disable loading button
        this.isLoggingIn.set(false);

        //load the user information to the user service
        //by decoding the access token
        this.userService.decodeJwtToken();

        this.appService.showSuccessToast('Login successful!', '');

        //navigate the user
        this.router.navigateByUrl(this.redirectUrl());
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
