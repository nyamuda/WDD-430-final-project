import { Injectable, WritableSignal, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileService } from '../files/file.service';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //current logged in user data
  public user: WritableSignal<User> = signal(new User());

  //show a loader during an HTTP POST OR UPDATE request
  public isProcessingRequest: WritableSignal<boolean> = signal(false);

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private fileService: FileService,
    private router: Router,
    private appService: AppService
  ) {}

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
    const url = `https://driving-school-5txd.onrender.com/users/${id}`;
    return this.http.get<User>(url);
  }

  //Get access token from local storage
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
      name: newUser.name,
      email: newUser.email,
      imageUrl: newUser.imageUrl,
    };

    //first update the image
    //and get the new imageUrl
    this.fileService.updateImage(newUser.imageUrl).subscribe((imageUrl) => {
      //update the imageUrl
      //if the returned imageUrl is null
      //in case the user did not upload a new image
      //assign the original imageUrl
      userDto.imageUrl = !!imageUrl ? imageUrl : userDto.imageUrl;

      //update the course
      this.http
        .put(`https://driving-school-5txd.onrender.com/users/${id}`, userDto, {
          headers,
        })
        .subscribe(
          (response) => {
            //stop loader
            this.isProcessingRequest.set(false);

            //get the new user details
            this.getUser(id).subscribe((user: User) => {
              this.appService.showSuccessToast(
                'Your profile has been updated',
                ''
              );

              this.user.set(user);

              this.router.navigateByUrl(`/account/${id}`);
            });
          },
          (error) => {
            //stop loader
            this.isProcessingRequest.set(false);

            //show toast
            let errorMessage = error['error']['message']
              ? error['error']['message']
              : error['error']['error'];

            if (errorMessage) {
              this.appService.showFailureToast(errorMessage, '');
            } else {
              this.appService.showFailureToast(
                'Please review your changes and try again.',
                'Update failed'
              );
            }
          }
        );
    });
  }

  //User placeholder image with the initials
  //of the user inside the placeholder image
  imagePlaceholderUrl(userName: string): string {
    if (userName) {
      userName = userName.toUpperCase();
      let placeholderUrl = 'https://placehold.co/600x400/000000/';
      let initials = '';
      //get the first initial
      let words = userName.split(' ');
      if (words.length == 1) {
        initials += words[0][0];

        //add a random color to the initial
        //and add the initial to the image
        let randomColor = this.generateRandomColorHexCode();
        let fullUrl = `${placeholderUrl}${randomColor}?text=${initials}`;
        return fullUrl;
      }
      //get two initials
      if (words.length >= 2) {
        initials += words[0][0];
        initials += words[1][0];

        //add a random color to the initials
        //and add the initials to the image
        let randomColor = this.generateRandomColorHexCode();
        let fullUrl = `${placeholderUrl}${randomColor}?text=${initials}`;
        return fullUrl;
      }
    }

    return '../../assets/images/placeholder/placeholder1.png';
  }

  generateRandomColorHexCode(): string {
    const hexCodes: string[] = [];

    for (let i = 0; i < 10; i++) {
      // Generate a random color by creating a random 6-character hex code
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
      hexCodes.push(randomColor);
    }

    return hexCodes[0];
  }
}
