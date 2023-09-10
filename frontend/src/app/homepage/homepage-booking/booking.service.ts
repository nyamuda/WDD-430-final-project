import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Booking } from './booking.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  public isBooking: WritableSignal<boolean> = signal(false);

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  book(booking: Booking) {
    this.isBooking.set(true);

    const url = 'http://localhost:8000/book';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, booking, { headers }).subscribe(
      (response) => {
        //show toast
        this.showSuccess();

        //disable loading button
        this.isBooking.set(false);
      },
      (error) => {
        //show toast
        //show toast
        let message = error['error']['message']
          ? error['error']['message']
          : error['error']['error'];
        this.showFailure(message);
        //disable loading button
        this.isBooking.set(false);
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
