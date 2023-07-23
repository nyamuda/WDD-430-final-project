import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../users/user.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggingIn: WritableSignal<boolean> = signal(false); // show loading button;
  rememberMe: WritableSignal<boolean> = signal(false); // remember me on log in
  //redirect URL if log in is a success
  //default is the homepage
  redirectUrl: WritableSignal<string> = signal('/courses');
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  login(newUser: User) {
    this.isLoggingIn.set(true);

    let userDto = {
      email: newUser.email.trim(),
      password: newUser.password.trim(),
    };
    const url = 'http://localhost:8000/login';
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

        //show toast
        this.showSuccess("You're now logged in.", 'Success!');

        //disable loading button
        this.isLoggingIn.set(false);

        //navigate the user
        this.router.navigateByUrl(this.redirectUrl());
      },
      (error) => {
        //show toast
        let message = error['error']['message']
          ? error['error']['message']
          : error['error']['error'];
        this.showFailure(message);
        //disable loading button
        this.isLoggingIn.set(false);
      }
    );
  }

  //show success toast
  showSuccess(message: string, title: string) {
    this.toastrService.success(`${message}`, `${title}`, {
      timeOut: 10000,
      // progressAnimation: 'increasing',
      // progressBar: true,
    });
  }

  //show failure toast
  showFailure(message: string) {
    this.toastrService.error(`${message}`, 'Login failed', {
      timeOut: 10000,
      // progressAnimation: 'increasing',
      // progressBar: true,
    });
  }

  // When the user logs out
  logout() {
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_token');
    //clear the stored information about the user
    this.userService.user.set(new User());

    this.showSuccess(
      "You've been logged out",
      'We hope to see you again soon!'
    );

    this.router.navigateByUrl('/courses');
  }
}
