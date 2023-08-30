import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Contact } from './contact.model';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  public isContacting: WritableSignal<boolean> = signal(false);

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private appService: AppService
  ) {}

  contact(contact: Contact) {
    //show loader
    this.isContacting.set(true);

    const url = 'http://localhost:8000/contact';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let contactDto = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
    };
    this.http.post(url, contactDto, { headers }).subscribe(
      (response) => {
        //disable loading button
        this.isContacting.set(false);
        let message =
          "Your message has been submitted successfully. We'll get back to you soon.";
        this.appService.showSuccessToast(message, '', 'bottom');
      },
      (error) => {
        //show toast
        //show toast
        let message = error['error']['message']
          ? error['error']['message']
          : error['error']['error']
          ? error['error']['error']
          : 'Sorry, your message could not be sent. Please refresh the page and retry.';
        this.appService.showFailureToast(
          message,
          'Submission failed',
          'bottom'
        );
        //disable loading button
        this.isContacting.set(false);
      }
    );
  }
}
