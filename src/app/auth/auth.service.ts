import { Injectable, WritableSignal, Signal } from '@angular/core';
import { LoginService } from '../login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private loginService: LoginService,
    private jwtHelper: JwtHelperService,
    private userService: UsersService
  ) {}

  isAuthenticated(): boolean {
    //get the current access token
    let token = this.userService.getJwtToken();

    //if token doesn't' exist
    //the user is not logged in
    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
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
}
