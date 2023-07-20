import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../users/user.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  isRegistering: WritableSignal<boolean> = signal(false); // show loading button;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  register(newUser: User) {
    this.isRegistering.set(true);

    let userDto = {
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      password: newUser.password.trim(),
    };
    const url = 'http://localhost:8000/register';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, userDto, { headers }).subscribe(
      (response) => {
        console.log(response['token']);
        //show toast
        this.showSuccess();

        //disable loading button
        this.isRegistering.set(false);

        //take the user to the login page
        this.router.navigateByUrl('/login');
      },
      (error) => {
        //show toast
        //show toast
        let message = error['error']['message']
          ? error['error']['message']
          : error['error']['error'];
        this.showFailure(message);
        //disable loading button
        this.isRegistering.set(false);
      }
    );
  }

  //show success toast
  showSuccess() {
    this.toastrService.success(
      `You can now log in with your credentials.`,
      'Registration Successful',
      {
        timeOut: 10000,
        // progressAnimation: 'increasing',
        // progressBar: true,
      }
    );
  }

  //show failure toast
  showFailure(message: string) {
    this.toastrService.error(`${message}`, 'Registration failed', {
      timeOut: 10000,
      // progressAnimation: 'increasing',
      // progressBar: true,
    });
  }
}
