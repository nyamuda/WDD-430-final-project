import { Component, Signal, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../contact.model';

import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';
import { ContactUsService } from '../contact-us.service';

@Component({
  selector: 'app-contact-us-item',
  templateUrl: './contact-us-item.component.html',
  styleUrls: ['./contact-us-item.component.scss'],
})
export class ContactUsItemComponent implements OnInit {
  contactFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactUsService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.contactFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      phone: ['', [Validators.required, Validators.minLength(8)]],
      message: [''],
    });

    //clear the form once the message is a success
    this.contactService.isMessageSuccess.subscribe((success: boolean) => {
      if (success) {
        this.contactFormGroup.reset();
        this.contactFormGroup.markAsUntouched();
      }
    });
  }

  submitForm() {
    if (this.contactFormGroup.valid) {
      //get the input values
      let name = this.contactFormGroup.get('name').value;
      let email = this.contactFormGroup.get('email').value;
      let phone = this.contactFormGroup.get('phone').value;
      let message = this.contactFormGroup.get('message').value;

      let contact = new Contact();
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      contact.message = message;

      this.contactService.contact(contact);
    }
  }

  //show the loading button when booking is in progress
  contacting: Signal<boolean> = computed(() =>
    this.contactService.isContacting()
  );

  //information about the current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());
}
