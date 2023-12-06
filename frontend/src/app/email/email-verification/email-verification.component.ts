import { Component, OnInit, Signal, computed } from '@angular/core';
import { EmailVerificationService } from './email-verification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../../users/users.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  verified: boolean;
  constructor(
    private emailVerificationService: EmailVerificationService,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    //check to see if an email to verify has been provided
    if (!this.emailVerificationService.emailToVerify()) {
      this.router.navigateByUrl('/login');
    }
  }

  resendVerificationEmail() {
    this.emailVerificationService.sendVerificationEmail();
  }

  isSendingEmailSignal: Signal<boolean> = computed(() =>
    this.emailVerificationService.isSendingEmailSignal()
  );
}
