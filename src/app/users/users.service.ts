import { Injectable, WritableSignal, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //current logged in user data
  public user: WritableSignal<User> = signal(new User());

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}

  public async decodeJwtToken() {
    //if the token exists
    if (!!this.getJwtToken()) {
      let decodedToken = this.jwtHelper.decodeToken(this.getJwtToken());

      //get user ID from the payload
      let userId = decodedToken.userId;

      //get all the full information about the user
      this.getUser(userId).subscribe((user: User) => {
        this.user.set(user);
        console.log(user);
      });
    }
  }

  public getUser(id: string): Observable<User> {
    const url = `http://localhost:8000/users/${id}`;
    return this.http.get<User>(url);
  }

  public getJwtToken(): string {
    //check if there is a token in session storage
    let sessionToken = sessionStorage.getItem('jwt_token');
    //check if there is a token in local storage
    let localToken = localStorage.getItem('jwt_token');

    //the current token
    let token = sessionToken ? sessionToken : localToken ? localToken : '';

    if (token) {
      //if the token has not expired
      if (!this.jwtHelper.isTokenExpired(token)) {
        return token;
      }
      return '';
    }

    return '';
  }
}
