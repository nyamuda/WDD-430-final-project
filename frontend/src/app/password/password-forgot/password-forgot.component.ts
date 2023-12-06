import { Component, Signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss'],
})
export class PasswordForgotComponent {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
    });
  }

  isSendingEmailSignal: Signal<boolean> = computed(() =>
    this.passwordService.isSendingEmailSignal()
  );

  submitForm(event: Event) {
    event.preventDefault();
    if (this.formGroup.valid) {
      let email = this.formGroup.get('email').value;
      this.passwordService.sendPasswordResetEmail(email);
    }
  }
}
