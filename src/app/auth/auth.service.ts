import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private loginService: LoginService,
    private jwtHelper: JwtHelperService
  ) {}
  isAuthenticated(): boolean {
    //check if there is a token in session storage
    let sessionToken = sessionStorage.getItem('jwt_token');
    //check if there is a token in local storage
    let localToken = localStorage.getItem('jwt_token');

    //the current token
    let token = sessionToken ? sessionToken : localToken;

    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }
}
