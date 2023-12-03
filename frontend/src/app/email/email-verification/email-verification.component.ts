import { Component, OnInit } from '@angular/core';
import { EmailVerificationService } from './email-verification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  verified: boolean;
  constructor(
    private emailVerificationService: EmailVerificationService,
    private activatedRoute: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private userService: UsersService,
    private router: Router
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
}
