import { Component, Signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage-booking',
  templateUrl: './homepage-booking.component.html',
  styleUrls: ['./homepage-booking.component.scss'],
})
export class HomepageBookingComponent {
  bookFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.bookFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm() {
    if (this.bookFormGroup.valid) {
      //get the input values
      let name = this.bookFormGroup.get('name').value;
      let email = this.bookFormGroup.get('email').value;
      let phone = this.bookFormGroup.get('phone').value;

      // let user = new User();
      // user.name = name;
      // user.email = email;
      // user.password = password;

      // this.registerService.register(user);
    }
  }

  //show the loading button when registration is in progress
  booking: Signal<boolean> = computed(
    () =>
      // this.registerService.isRegistering()
      true
  );
}
