import { Component, OnInit, Signal, computed } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService, OauthUrls } from './login.service';
import { User } from '../users/user.model';
import { ActivatedRoute } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFormGroup: FormGroup;
  rememberMe: boolean = false;
  googleUrl = '';
  facebookUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //FORM GROUP START
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ],
      ],
    });
    //FORM GROUP END

    //PARAMS START
    this.route.queryParams.subscribe((params) => {
      let code = params['code'];

      //Google redirect url and code
      if (window.location.pathname.includes('/oauth/google/callback') && code) {
        //use the code to get the JWT token
        //from the server
        this.loginService.getGoogleUserJwtToken(code);
      }
    });
    //PARAMS END

    //OAUTH URLs START
    this.loginService.getOauthUrls().subscribe((urls: OauthUrls) => {
      this.googleUrl = urls.googleUrl;
      this.facebookUrl = urls.facebookUrl;
    });
    //OAUTH URLs END
  }

  submitForm() {
    if (this.loginFormGroup.valid) {
      //get the input values
      let email = this.loginFormGroup.get('email').value;
      let password = this.loginFormGroup.get('password').value;

      let user = new User();
      user.email = email;
      user.password = password;

      //remember the user or not on log in
      this.loginService.rememberMe.set(this.rememberMe);

      //log in the user
      this.loginService.login(user);
    }
  }

  //show the loading button when registration is in progress
  logging: Signal<boolean> = computed(() => this.loginService.isLoggingIn());

  //Remember checkbox
  onCheckboxCheck() {
    this.rememberMe = !this.rememberMe;
  }

  googleLogin() {
    // Redirect to the Google OAuth login page
    window.location.href = this.googleUrl;
  }
}
