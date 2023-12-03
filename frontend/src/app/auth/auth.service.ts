import { Injectable, WritableSignal, Signal } from '@angular/core';
import { LoginService } from '../login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { EmailVerificationService } from '../email-verification/email-verification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private loginService: LoginService,
    private jwtHelper: JwtHelperService,
    private userService: UsersService,
    private emailVerificationService: EmailVerificationService
  ) {}

  isAuthenticated(): boolean {
    //get the current access token
    let token = this.userService.getJwtToken();

    //if token doesn't' exist
    //the user is not logged in
    if (!token) {
      return false;
    }

    return true;
  }
  //check if its the admin
  isAdmin(): boolean {
    //get the current access token
    let token = this.userService.getJwtToken();

    //if token doesn't' exist
    //the user is not logged in
    if (!token) {
      return false;
    }

    //decode the token and check it the user is an admin
    let decodedToken = this.jwtHelper.decodeToken(token);

    return decodedToken.isAdmin;
  }

  //get user decoded access token
  getTokenInfo(): string {
    if (this.isAuthenticated()) {
      let token = this.userService.getJwtToken();
      return this.jwtHelper.decodeToken(token);
    }
    return '';
  }
}
