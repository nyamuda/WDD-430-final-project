import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Booking } from './booking.model';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  public isBooking: WritableSignal<boolean> = signal(false);

  //clear the form once the booking is a success
  public isBookingSuccess = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private appService: AppService
  ) {}

  book(booking: Booking) {
    //show loader
    this.isBooking.set(true);

    const url = 'https://driving-school-5txd.onrender.com/booking';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let bookingDto = {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      address: booking.address,
      time: booking.time,
      date: booking.date,
      service: booking.service,
    };
    this.http.post(url, bookingDto, { headers }).subscribe(
      (response) => {
        //disable loading button
        this.isBooking.set(false);
        this.appService.showSuccessToast(
          'Your driving lesson booking is confirmed',
          '',
          'bottom-center'
        );
        this.isBookingSuccess.next(true);
        this.router.navigateByUrl('/booking');
      },
      (error) => {
        //show toast
        //show toast
        let message = error['error']['message']
          ? error['error']['message']
          : error['error']['error']
          ? error['error']['error']
          : 'Please review your data and try again.';
        this.appService.showFailureToast(
          message,
          'Booking submission failed',
          'bottom-center'
        );
        //disable loading button
        this.isBooking.set(false);
      }
    );
  }
}
