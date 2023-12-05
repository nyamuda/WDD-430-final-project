import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../users/user.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { EmailVerificationService } from '../email/email-verification/email-verification.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  isRegistering: WritableSignal<boolean> = signal(false); // show loading button;

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private emailVerificationService: EmailVerificationService,
    private router: Router
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

        //verify the user email
        let emailToVerify = userDto.email; //the email that needs to be verified
        //save the email to session storage
        sessionStorage.setItem('email_to_verify', emailToVerify);
        this.emailVerificationService.sendVerificationEmail();
        this.router.navigateByUrl('email-verification');
      },
      (error) => {
        //show toast
        //show toast
        let message = error['error']['message']
          ? error['error']['message']
          : error['error']['error']
          ? error['error']['error']
          : 'An unexpected error occurred on the server.';
        this.appService.showFailureToast(message, 'Registration failed');
        //disable loading button
        this.isRegistering.set(false);
      }
    );
  }
}
