import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { OauthService, OauthUrls } from './oauth.service';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss'],
})
export class OauthComponent implements OnInit {
  //action -sign up or sign in
  @Input() action = '';
  googleUrl = '';
  facebookUrl = '';

  /*Purpose: Execute the function that read the 'code' query parameter from the redirect URL of Oauth API 
  to get the access token.
  Reason: If the component is nested and shown in the login and register tabs in login component, 
  we don't want the getOauthUserToken() function to get executed twice.*/
  @Input() runUrlCodeParamFn: boolean = true;

  constructor(
    private oauthService: OauthService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    //OAUTH URLs START
    this.oauthService.getOauthUrls().subscribe((urls: OauthUrls) => {
      this.googleUrl = urls.googleUrl;
      this.facebookUrl = urls.facebookUrl;
    });
    //OAUTH URLs END

    //PARAMS START
    this.route.queryParams.subscribe((params) => {
      let code = params['code'];
      let stateFromUrl = params['state'];

      //use the 'code' to get the access token from the server
      if (this.runUrlCodeParamFn && code && stateFromUrl) {
        this.getOauthUserToken(code, stateFromUrl);
      }
    });
    //PARAMS END
  }

  googleLogin() {
    //Generate the state parameter
    let stateParameter = this.oauthService.generateRandomState(
      this.loginService.redirectUrl()
    );

    let url = `${this.googleUrl}&state=${stateParameter}`;
    // Redirect to the Google OAuth login page
    window.location.href = url;
  }

  facebookLogin() {
    //Generate the state parameter
    let stateParameter = this.oauthService.generateRandomState(
      this.loginService.redirectUrl()
    );

    let url = `${this.facebookUrl}&state=${stateParameter}`;
    // Redirect to the Facebook OAuth login page
    window.location.href = url;
  }

  //Use the 'code' in to get the access token from the server
  getOauthUserToken(code: string, urlState: string) {
    //compare the state parameters
    if (this.oauthService.compareStates(urlState)) {
      //Google redirect url and code
      if (window.location.pathname.includes('/oauth/google/callback') && code) {
        //use the code to get the JWT token
        //from the server
        this.oauthService.getGoogleUserJwtToken(code);
      }

      //Facebook redirect url and code
      if (
        window.location.pathname.includes('/oauth/facebook/callback') &&
        code
      ) {
        //use the code to get the JWT token
        //from the server
        this.oauthService.getFacebookUserJwtToken(code);
      }
    }
  }
}
