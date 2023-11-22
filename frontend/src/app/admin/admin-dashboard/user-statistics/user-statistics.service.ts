import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Booking } from '../../../booking/booking.model';
import { UsersService } from '../../../users/users.service';


@Injectable({
  providedIn: 'root',
})
export class UserStatisticsService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UsersService,
    private appService: AppService
  ) {}


  //Get all bookings
  getBookings(): Observable<Booking[]> {
    const url = `${this.appService.apiUrl}/booking`;
    return this.http.get<Booking[]>(url);
  }

  headers(): HttpHeaders {
    let token = this.userService.getJwtToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }

 
}
