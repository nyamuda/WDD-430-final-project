import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../users/user.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  register(newUser: User) {
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
      },
      (error) => {
        //show toast

        this.showFailure(error['error']['message']);
      }
    );
  }
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

  showFailure(message: string) {
    this.toastrService.error(`${message}`, 'Registration failed', {
      timeOut: 10000,
      // progressAnimation: 'increasing',
      // progressBar: true,
    });
  }
}
