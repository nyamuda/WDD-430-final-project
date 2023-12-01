import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../users/user.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { EmailVerificationService } from '../email-verification/email-verification.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  isRegistering: WritableSignal<boolean> = signal(false); // show loading button;

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private emailVerificationService: EmailVerificationService
  ) {}

  register(newUser: User) {
    this.isRegistering.set(true);

    let userDto = {
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      password: newUser.password.trim(),
    };
    const url = `${this.appService.apiUrl}/register`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, userDto, { headers }).subscribe(
      (response) => {
        //disable loading button
        this.isRegistering.set(false);

        //save the JWT token to session storage
        sessionStorage.setItem('jwt_token', response['token']);

        //ask the user to verify their email
        this.emailVerificationService.checkUserEmailVerified(response['token']);
      },
      (error) => {
        //show toast
        //show toast
        let message = error['error']['message']
          ? error['error']['message']
          : error['error']['error'];
        this.appService.showFailureToast(message, 'Registration failed');
        //disable loading button
        this.isRegistering.set(false);
      }
    );
  }
}
