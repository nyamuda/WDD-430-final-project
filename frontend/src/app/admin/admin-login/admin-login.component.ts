import { Component, Signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.min(8)]],
    });
  }

  isLoggingIn: Signal<boolean> = computed(() =>
    this.adminService.isLoggingIn()
  );

  submitForm() {
    if (this.formGroup.valid) {
      let email = this.formGroup.get('email').value;
      let password = this.formGroup.get('password').value;
      let user = new User();
      user.email = email;
      user.password = password;

      this.adminService.login(user);
    }
  }
}
