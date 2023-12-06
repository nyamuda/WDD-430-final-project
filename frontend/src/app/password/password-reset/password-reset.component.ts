import { Component, OnInit, Signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from '../password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  formGroup!: FormGroup;
  token = '';
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private activatedRoute: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit() {
    //fetch the token query parameter
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];

      //if the token exists
      if (this.token) {
        //first get the ID of the user associated with that token
        let decodedToken = this.jwtHelper.decodeToken(this.token);
        this.userId = decodedToken.userId;
      }

      //password reset failed
      else {
        this.passwordService.resetResultSignal.set('fail');
        this.router.navigateByUrl('/password/result');
      }
    });

    //form group for password reset
    this.formGroup = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator function for password matching
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  isResettingPassword: Signal<boolean> = computed(() =>
    this.passwordService.isResettingPasswordSignal()
  );

  submitForm(event: Event) {
    event.preventDefault();
    if (this.formGroup.valid && this.token) {
      let password = this.formGroup.get('password').value;
      this.passwordService.resetPassword(password, this.token, this.userId);
    }
  }
}
