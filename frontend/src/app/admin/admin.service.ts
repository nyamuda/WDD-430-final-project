import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../users/user.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { CompanyInfo } from './admin-dashboard/company-info/company-info.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  isLoggingIn: WritableSignal<boolean> = signal(false); // show loading button;
  //redirect URL if log in is a success
  //default is the homepage
  redirectUrl: WritableSignal<string> = signal('dashboard');
  companyInfoList: WritableSignal<CompanyInfo[]> = signal(
    new Array<CompanyInfo>()
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UsersService,
    private appService: AppService
  ) {}

  login(newUser: User) {
    this.isLoggingIn.set(true);

    let userDto = {
      email: newUser.email.trim(),
      password: newUser.password.trim(),
    };
    const url = `${this.appService.apiUrl}/login/admin`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, userDto, { headers }).subscribe(
      (response) => {
        // save the JWT token to session storage
        sessionStorage.setItem('jwt_token', response['token']);

        //disable loading button
        this.isLoggingIn.set(false);

        //load the user information to the user service
        //by decoding the access token
        this.userService.decodeJwtToken();

        this.appService.showSuccessToast('Login successful!', '');

        //navigate the user
        this.router.navigateByUrl(this.redirectUrl());
      },
      (error) => {
        //disable loading button
        this.isLoggingIn.set(false);

        //show toast
        let errorMessage = error['error']['message']
          ? error['error']['message']
          : error['error']['error']
          ? error['error']['error']
          : 'Please review your login credentials and try again.';

        this.appService.showFailureToast(errorMessage, 'Login failed');
      }
    );
  }

  //get the company information by id
  getCompanyInfoById(id: string): Observable<CompanyInfo> {
    const url = `${this.appService.apiUrl}/company-info/${id}`;
    return this.http.get<CompanyInfo>(url);
  }

  //get all the company information
  getCompanyInformation(): void {
    const url = `${this.appService.apiUrl}/company-info/`;

    this.http.get<CompanyInfo[]>(url).subscribe((info: CompanyInfo[]) => {
      this.companyInfoList.set(info);
    });
  }
}
