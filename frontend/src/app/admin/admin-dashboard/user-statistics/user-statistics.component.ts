import { Component, OnInit } from '@angular/core';
import { UserStatisticsService } from './user-statistics.service';
import { Booking } from '../../../booking/booking.model';
import moment from 'moment';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss'],
})
export class UserStatisticsComponent implements OnInit {
  bookingsThisWeek: number;
  bookingsLastWeek: number;
  bookingsThisMonth: number;
  bookingsLastMonth: number;
  bookingsThisYear: number;
  bookingsLastYear: number;

  constructor(private statsService: UserStatisticsService) {}

  ngOnInit(): void {
    this.statsService.getBookings().subscribe((bookings: Booking[]) => {
      this.filterBookings(bookings);
    });
  }

  //Filter bookings based on specific time periods
  filterBookings(bookings: Booking[]) {
    const today = moment();
    const thisWeekStart = today.startOf('week');

    // Create a separate moment object for last week start
    const lastWeekStart = moment().subtract(1, 'week').startOf('week');

    const thisMonthStart = today.startOf('month');

    // Create a separate moment object for last month start
    const lastMonthStart = moment().subtract(1, 'month').startOf('month');

    const thisYearStart = today.startOf('year');

    // Create a separate moment object for last year start
    const lastYearStart = moment().subtract(1, 'year').startOf('year');

    this.bookingsThisWeek = bookings.filter((booking) =>
      moment(booking.createdAt).isSame(thisWeekStart, 'day')
    ).length;
    this.bookingsLastWeek = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(lastWeekStart, thisWeekStart, 'day')
    ).length;
    this.bookingsThisMonth = bookings.filter((booking) =>
      moment(booking.createdAt).isSame(thisMonthStart, 'day')
    ).length;
    this.bookingsLastMonth = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(lastMonthStart, thisMonthStart, 'day')
    ).length;
    this.bookingsThisYear = bookings.filter((booking) =>
      moment(booking.createdAt).isSameOrAfter(thisYearStart, 'day')
    ).length;
    this.bookingsLastYear = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(lastYearStart, thisYearStart, 'day')
    ).length;
  }
}
