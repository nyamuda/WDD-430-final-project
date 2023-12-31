import { Component, OnInit } from '@angular/core';
import { UserStatisticsService } from '../user-statistics.service';
import { Booking } from '../../../../booking/booking.model';
import moment from 'moment';

@Component({
  selector: 'app-bookings-statistics',
  templateUrl: './bookings-statistics.component.html',
  styleUrls: ['./bookings-statistics.component.scss'],
})
export class BookingsStatisticsComponent implements OnInit {
  //Days
  dailyBookings: dayStatistics;
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

  monthNames: string[];
  monthYearlyBookings: number[];

  //Years
  thisYear: number;
  lastYear: number;
  twoYearsAgo: number;
  threeYearsAgo: number;

  constructor(private statsService: UserStatisticsService) {}

  ngOnInit(): void {
    this.statsService.getBookings().subscribe((bookings: Booking[]) => {
      this.filterBookings(bookings);
      this.dailyBookings = this.filterBookingsByDay(bookings);
      this.monthNames = this.getMonthNames(
        this.filterBookingsByMonth(bookings)
      );

      console.log(this.filterBookingsByMonth(bookings));
      this.monthYearlyBookings = this.getMonthBookings(
        this.filterBookingsByMonth(bookings)
      );
    });
  }

  //Background color
  backgroundColor = (color: string): string[] => Array(4).fill(color);

  //Filter bookings based on specific time periods
  // Filter bookings based on specific time periods
  filterBookings(bookings: Booking[]) {
    const today = moment();

    // This week
    const thisWeekStart = today.startOf('week');
    this.thisWeek = bookings.filter((booking) =>
      moment(booking.createdAt).isSameOrAfter(thisWeekStart, 'day')
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
      moment(booking.createdAt).isSameOrAfter(thisMonthStart, 'day')
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

  //Filter bookings for each day of the current week
  filterBookingsByDay(bookings: Booking[]): dayStatistics {
    const today = moment();
    const dayOne = today.clone().startOf('week'); // Sunday
    const dayTwo = dayOne.clone().add(1, 'days'); // Monday
    const dayThree = dayOne.clone().add(2, 'days'); // Tuesday
    const dayFour = dayOne.clone().add(3, 'days'); // Wednesday
    const dayFive = dayOne.clone().add(4, 'days'); // Thursday
    const daySix = dayOne.clone().add(5, 'days'); // Friday
    const daySeven = dayOne.clone().add(6, 'days'); // Saturday

    const filteredBookings = {
      dayOne: bookings.filter((booking) =>
        moment(booking.createdAt).isSame(dayOne, 'day')
      ).length,
      dayTwo: bookings.filter((booking) =>
        moment(booking.createdAt).isSame(dayTwo, 'day')
      ).length,
      dayThree: bookings.filter((booking) =>
        moment(booking.createdAt).isSame(dayThree, 'day')
      ).length,
      dayFour: bookings.filter((booking) =>
        moment(booking.createdAt).isSame(dayFour, 'day')
      ).length,
      dayFive: bookings.filter((booking) =>
        moment(booking.createdAt).isSame(dayFive, 'day')
      ).length,
      daySix: bookings.filter((booking) =>
        moment(booking.createdAt).isSame(daySix, 'day')
      ).length,
      daySeven: bookings.filter((booking) =>
        moment(booking.createdAt).isSame(daySeven, 'day')
      ).length,
    };

    return filteredBookings;
  }

  //Filter bookings for each month of all the years
  filterBookingsByMonth(bookings: Booking[]): monthlyStatistics[] {
    const months = moment.months(); // Get an array of month names
    const filteredBookingsByMonth: { month: string; bookings: number }[] = [];

    for (const month of months) {
      const bookingsCount = bookings.filter((booking) =>
        moment(booking.createdAt)
          .month(month)
          .isSame(moment(booking.createdAt), 'month')
      ).length;

      filteredBookingsByMonth.push({ month, bookings: bookingsCount });
    }

    return filteredBookingsByMonth;
  }

  //Get all the month names as as array
  getMonthNames(filteredBookings: monthlyStatistics[]): string[] {
    return filteredBookings.map((entry) => entry.month);
  }
  //Get all the booking values for the months as an array
  getMonthBookings(filteredBookings: monthlyStatistics[]): number[] {
    return filteredBookings.map((entry) => entry.bookings);
  }
}

interface dayStatistics {
  dayOne: number;
  dayTwo: number;
  dayThree: number;
  dayFour: number;
  dayFive: number;
  daySix: number;
  daySeven: number;
}

interface monthlyStatistics {
  month: string;
  bookings: number;
}
