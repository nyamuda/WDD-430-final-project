import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmailVerificationService {
  userSignal: Signal<User> = computed(() => this.userService.user());
  emailToVerify: WritableSignal<string> = signal('');

  constructor(
    private appService: AppService,
    private http: HttpClient,
    private userService: UsersService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  //send verification email if the user is not verified
  sendVerificationEmail() {
    let userDto = {
      email: this.emailToVerify,
    };
    const url = `${this.appService.apiUrl}/email-verification/send`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, userDto, { headers }).subscribe(
      (response) => {},
      (error) => {
        //show toast
        //show toast
        this.appService.showFailureToast('Verification failed', '');
      }
    );
  }

  //verify user
  verifyUser(userId: string, token: string) {
    let verificationToken = { userId, token };

    const url = `${this.appService.apiUrl}/users/verify`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(url, verificationToken, { headers }).subscribe(
      (response) => {
        this.router.navigateByUrl('email-verification/success');
      },
      (error) => {
        this.router.navigateByUrl('email-verification/fail');
      }
    );
  }

  //check if the user has verified their email when they login
  checkUserEmailVerified(token: string): boolean {
    //check to see if the user is verified
    let decodedToken = this.jwtHelper.decodeToken(token);
    let verified: boolean = decodedToken.verified;
    let email = decodedToken.email;
    if (verified) {
      return true;
    }

    return false;
  }
}
