import { Injectable, WritableSignal, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileService } from '../files/file.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //current logged in user data
  public user: WritableSignal<User> = signal(new User());

  //show a loader during an HTTP POST OR UPDATE request
  public isProcessingRequest: WritableSignal<boolean> = signal(false);

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient, private fileService:FileService, private router:Router) {}

  public async decodeJwtToken() {
    //if the token exists
    if (!!this.getJwtToken()) {
      let decodedToken = this.jwtHelper.decodeToken(this.getJwtToken());

      //get user ID from the payload
      let userId = decodedToken.userId;

      //get all the full information about the user
      this.getUser(userId).subscribe((user: User) => {
        this.user.set(user);
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

  //Update user details
  updateUser(id: string, newUser: User) {
    //headers
    let token = this.getJwtToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    //show loader
    this.isProcessingRequest.set(true);
    let userDto = {
      name:newUser.name,
      email:newUser.email,
      imageUrl:this.user().imageUrl
    };

    //first update the image
    //and get the new imageUrl
    this.fileService.updateImage(newUser.imageUrl).subscribe((imageUrl) => {
      //update the imageUrl
      //if if the returned imageUrl is null
      //in case the user did not upload a new image
      //assign the original imageUrl
      userDto.imageUrl = !!imageUrl ? imageUrl : userDto.imageUrl;

      //update the course
      this.http
        .put(`http://localhost:8000/users/${id}`, userDto, {
          headers,
        })
        .subscribe(
          (response) => {
            //stop loader
            this.isProcessingRequest.set(false);

            //get the new user details
            this.getUser(id).subscribe((user:User)=>{
              this.showSuccess('The course has been updated', 'Success!');

              this.router.navigateByUrl(`/account/${id}`);
            })

            
          },
          (error) => {
            //stop loader
            this.isProcessingRequest.set(false);
            this.showFailure(
              'Please review your changes and try again.',
              'Course update failed'
            );
          }
        );
    });
  }
}
