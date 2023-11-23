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
  //Weeks
  thisWeek: number;
  lastWeek: number;
  twoWeeksAgo: number;
  threeWeeksAgo: number;

  //Months
  thisMonth: number;
  lastMonth: number;
  twoMonthsAgo: number;
  threeMonthsAgo: number;

  //Years
  thisYear: number;
  lastYear: number;
  twoYearsAgo: number;
  threeYearsAgo: number;

  constructor(private statsService: UserStatisticsService) {}

  ngOnInit(): void {
    this.statsService.getBookings().subscribe((bookings: Booking[]) => {
      this.filterBookings(bookings);

      console.log(this.thisYear);
    });
  }

  //Filter bookings based on specific time periods
  // Filter bookings based on specific time periods
  filterBookings(bookings: Booking[]) {
    const today = moment();

    // This week
    const thisWeekStart = today.startOf('week');
    this.thisWeek = bookings.filter((booking) =>
      moment(booking.createdAt).isSame(thisWeekStart, 'day')
    ).length;

    // Last week
    const lastWeekStart = moment().subtract(1, 'week').startOf('week');
    const lastWeekEnd = lastWeekStart.clone().endOf('week');
    this.lastWeek = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(lastWeekStart, lastWeekEnd, 'day')
    ).length;

    // Two weeks ago
    const twoWeeksAgoStart = moment().subtract(2, 'weeks').startOf('week');
    const twoWeeksAgoEnd = twoWeeksAgoStart.clone().endOf('week');
    this.twoWeeksAgo = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(
        twoWeeksAgoStart,
        twoWeeksAgoEnd,
        'day'
      )
    ).length;

    // Three weeks ago
    const threeWeeksAgoStart = moment().subtract(3, 'weeks').startOf('week');
    const threeWeeksAgoEnd = threeWeeksAgoStart.clone().endOf('week');
    this.threeWeeksAgo = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(
        threeWeeksAgoStart,
        threeWeeksAgoEnd,
        'day'
      )
    ).length;

    // This month
    const thisMonthStart = today.startOf('month');
    this.thisMonth = bookings.filter((booking) =>
      moment(booking.createdAt).isSame(thisMonthStart, 'day')
    ).length;

    // Last month
    const lastMonthStart = moment().subtract(1, 'month').startOf('month');
    const lastMonthEnd = lastMonthStart.clone().endOf('month');
    this.lastMonth = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(lastMonthStart, lastMonthEnd, 'day')
    ).length;

    // Two months ago
    const twoMonthsAgoStart = moment().subtract(2, 'months').startOf('month');
    const twoMonthsAgoEnd = twoMonthsAgoStart.clone().endOf('month');
    this.twoMonthsAgo = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(
        twoMonthsAgoStart,
        twoMonthsAgoEnd,
        'day'
      )
    ).length;

    // Three months ago
    const threeMonthsAgoStart = moment().subtract(3, 'months').startOf('month');
    const threeMonthsAgoEnd = threeMonthsAgoStart.clone().endOf('month');
    this.threeMonthsAgo = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(
        threeMonthsAgoStart,
        threeMonthsAgoEnd,
        'day'
      )
    ).length;

    // This year
    const thisYearStart = today.startOf('year');
    this.thisYear = bookings.filter((booking) =>
      moment(booking.createdAt).isSameOrAfter(thisYearStart, 'day')
    ).length;

    // Last year
    const lastYearStart = moment().subtract(1, 'year').startOf('year');
    const lastYearEnd = lastYearStart.clone().endOf('year');
    this.lastYear = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(lastYearStart, lastYearEnd, 'day')
    ).length;

    // Two years ago
    const twoYearsAgoStart = moment().subtract(2, 'years').startOf('year');
    const twoYearsAgoEnd = twoYearsAgoStart.clone().endOf('year');
    this.twoYearsAgo = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(
        twoYearsAgoStart,
        twoYearsAgoEnd,
        'day'
      )
    ).length;

    // Three years ago
    const threeYearsAgoStart = moment().subtract(3, 'years').startOf('year');
    const threeYearsAgoEnd = threeYearsAgoStart.clone().endOf('year');
    this.threeYearsAgo = bookings.filter((booking) =>
      moment(booking.createdAt).isBetween(
        threeYearsAgoStart,
        threeYearsAgoEnd,
        'day'
      )
    ).length;
  }
}
