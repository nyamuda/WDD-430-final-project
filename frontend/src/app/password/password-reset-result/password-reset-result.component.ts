import { Component, OnInit, Signal, computed } from '@angular/core';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-password-reset-result',
  templateUrl: './password-reset-result.component.html',
  styleUrls: ['./password-reset-result.component.scss'],
})
export class PasswordResetResultComponent {
  constructor(private passwordService: PasswordService) {}

  resetResult: Signal<string> = computed(() =>
    this.passwordService.resetResultSignal()
  );
}
