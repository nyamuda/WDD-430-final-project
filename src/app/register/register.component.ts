import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegisterService } from './register.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
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
    if (this.registerFormGroup.valid) {
      //get the input values
      let name = this.registerFormGroup.get('name').value;
      let email = this.registerFormGroup.get('email').value;
      let password = this.registerFormGroup.get('password').value;

      let user = new User();
      user.name = name;
      user.email = email;
      user.password = password;

      this.registerService.register(user);
    }
  }
  hello() {
    this.registerService.showSuccess();
  }
}
