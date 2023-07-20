import { Component, OnInit, Signal, computed } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFormGroup: FormGroup;
  rememberMe: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ],
      ],
    });
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
}
