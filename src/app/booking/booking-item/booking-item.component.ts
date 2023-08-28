import { Component, Signal, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss'],
})
export class BookingItemComponent {
  bookFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    //information about the logged in user
    let name=this.currentUser().name?this.currentUser().name:"";
    let email=this.currentUser().email?this.currentUser().email:"";
    this.bookFormGroup = this.formBuilder.group({
      name: [name, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],

      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      service: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.bookFormGroup.valid) {
      //get the input values
      let name = this.bookFormGroup.get('name').value;
      let email = this.bookFormGroup.get('email').value;
      let phone = this.bookFormGroup.get('phone').value;
      let service = this.bookFormGroup.get('service').value;
      let address = this.bookFormGroup.get('address').value;
      let date = this.bookFormGroup.get('date').value;
      let time = this.bookFormGroup.get('time').value;

      let booking = new Booking();
      booking.name = name;
      booking.email = email;
      booking.phone = phone;
      booking.service = service;
      booking.address = address;
      booking.date = date;
      booking.time = time;
    }
  }

  //show the loading button when booking is in progress
  booking: Signal<boolean> = computed(() => this.bookingService.isBooking());

  //information about the current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());
}
