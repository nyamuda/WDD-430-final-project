import { Component, OnInit, Input } from '@angular/core';
import { LoginService, OauthUrls } from '../login.service';
import { ActivatedRoute } from '@angular/router';

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
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //OAUTH URLs START
    this.loginService.getOauthUrls().subscribe((urls: OauthUrls) => {
      this.googleUrl = urls.googleUrl;
      this.facebookUrl = urls.facebookUrl;
    });
    //OAUTH URLs END

    //PARAMS START
    this.route.queryParams.subscribe((params) => {
      let code = params['code'];

      //use the 'code' to get the access token from the server
      if (this.runUrlCodeParamFn) {
        this.getOauthUserToken(code);
      }
    });
    //PARAMS END
  }

  googleLogin() {
    // Redirect to the Google OAuth login page
    window.location.href = this.googleUrl;
  }

  facebookLogin() {
    // Redirect to the Google OAuth login page
    window.location.href = this.facebookUrl;
  }

  //Use the 'code' in to get the access token from the server
  getOauthUserToken(code: string) {
    //Google redirect url and code
    if (window.location.pathname.includes('/oauth/google/callback') && code) {
      //use the code to get the JWT token
      //from the server
      this.loginService.getGoogleUserJwtToken(code);
    }

    //Facebook redirect url and code
    if (window.location.pathname.includes('/oauth/facebook/callback') && code) {
      //use the code to get the JWT token
      //from the server
      this.loginService.getFacebookUserJwtToken(code);
    }
  }
}
