import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../users/users.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  constructor(
    private http: HttpClient,
    private userService: UsersService,
    private appService: AppService,
    private router: Router,
    private loginService: LoginService
  ) {}

  //Get OAuth login URLs
  getOauthUrls(): Observable<OauthUrls> {
    const url = `${this.appService.apiUrl}/oauth/url`;

    return this.http.get<OauthUrls>(url);
  }

  //Compare two state objects
  //One from the redirect url and and another from session storage
  compareStates(redirectState: string): boolean {
    // Decode and parse the redirect state from the URL
    let urlState: StateObject | null = JSON.parse(atob(redirectState));
    let sessionState: StateObject | null = this.getStateFromSessionStorage();

    if (!(urlState && sessionState)) {
      this.appService.showFailureToast(
        'An unexpected error occurred on the server.'
      );
      return false;
    }

    //compare the states
    if (
      urlState.randomString === sessionState.randomString &&
      urlState.currentState === sessionState.currentState
    ) {
      //set the app redirect URL in case the login is a success
      this.appService.redirectUrl.set(sessionState.currentState);
      return true;
    }
    //show an error the states don't match
    this.appService.showFailureToast(
      'An unexpected error occurred on the server.'
    );
    return false;
  }

  //Login with google
  getGoogleUserJwtToken(code: string) {
    this.http
      .get(`${this.appService.apiUrl}/oauth/google/callback?code=${code}`)
      .subscribe(
        (response) => {
          //save the JWT token to local storage
          localStorage.setItem('jwt_token', response['token']);

          //load the user information to the user service
          //by decoding the access token from local storage
          this.userService.decodeJwtToken();

          this.appService.showSuccessToast('Login successful!', '');

          //navigate the user
          this.router.navigateByUrl(this.loginService.redirectUrl());

          //clear the state from the session storage
          sessionStorage.setItem('oauthState', '');
        },
        (error) => {
          //disable loading button
          // this.isLoggingIn.set(false);

          //show toast
          let errorMessage = error['error']['message']
            ? error['error']['message']
            : error['error']['error']
            ? error['error']['error']
            : 'An unexpected error occurred on the server.';

          this.appService.showFailureToast(errorMessage, '');
        }
      );
  }

  //Login with Facebook
  getFacebookUserJwtToken(code: string) {
    this.http
      .get(`${this.appService.apiUrl}/oauth/facebook/callback?code=${code}`)
      .subscribe(
        (response) => {
          //save the JWT token to local storage
          localStorage.setItem('jwt_token', response['token']);

          //load the user information to the user service
          //by decoding the access token from local storage
          this.userService.decodeJwtToken();

          this.appService.showSuccessToast('Login successful!', '');

          //navigate the user
          this.router.navigateByUrl(this.loginService.redirectUrl());
          //clear the state from the session storage
          sessionStorage.setItem('oauthState', '');
        },
        (error) => {
          // //disable loading button
          // this.isLoggingIn.set(false);

          //show toast
          let errorMessage = error['error']['message']
            ? error['error']['message']
            : error['error']['error']
            ? error['error']['error']
            : 'An unexpected error occurred on the server.';

          this.appService.showFailureToast(errorMessage, '');
        }
      );
  }

  //The state parameter for Oauth
  generateRandomState(currentState: string): string {
    // Generate a random string for security
    const randomString = Math.random().toString(36).substring(2);

    // Create the state object
    const stateObject = {
      randomString: randomString,
      currentState: currentState,
    };

    // Convert the state object to a JSON string
    const stateString = JSON.stringify(stateObject);

    // Save it to session storage
    sessionStorage.setItem('oauthState', stateString);

    //encode it
    let encodedState = btoa(stateString);
    return encodedState;
  }

  // Read the state object from session storage
  getStateFromSessionStorage(): StateObject | null {
    // Get the JSON string from session storage
    const stateString = sessionStorage.getItem('oauthState');

    // Check if it exists
    if (stateString) {
      // Parse the JSON string into an object
      const stateObject = JSON.parse(stateString);
      return stateObject;
    } else {
      // If it doesn't exist, return null
      return null;
    }
  }
}

export type OauthUrls = {
  googleUrl: string;
  facebookUrl: string;
};

export type StateObject = {
  randomString: string;
  currentState: string;
};
