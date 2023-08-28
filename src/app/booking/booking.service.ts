import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Booking } from './booking.model';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  public isBooking: WritableSignal<boolean> = signal(false);

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private appService: AppService
  ) {}

  book(booking: Booking) {
    //show loader
    this.isBooking.set(true);

    const url = 'http://localhost:8000/booking';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, booking, { headers }).subscribe(
      (response) => {
        //disable loading button
        this.isBooking.set(false);
        this.appService.showSuccessToast('Booking successful');
      },
      (error) => {
        //show toast
        //show toast
        let message = error['error']['message']
          ? error['error']['message']
          : error['error']['error'];
        this.appService.showFailureToast(message);
        //disable loading button
        this.isBooking.set(false);
      }
    );
  }
}
