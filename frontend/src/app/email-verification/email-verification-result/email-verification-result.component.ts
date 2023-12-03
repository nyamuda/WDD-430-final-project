import { Component, OnInit, Signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailVerificationService } from '../email-verification.service';
import { AppService } from 'src/app/app.service';
import { UsersService } from 'src/app/users/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-email-verification-result',
  templateUrl: './email-verification-result.component.html',
  styleUrls: ['./email-verification-result.component.scss'],
})
export class EmailVerificationResultComponent implements OnInit {
  success: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailVerificationService: EmailVerificationService,
    private appService: AppService,
    private userService: UsersService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let result = params['result'];
      if (result === 'success') {
        this.success = true;
      }
    });
  }

  resendVerificationEmail() {
    //get the user email from token
    let decodedToken = this.jwtHelper.decodeToken(
      this.userService.getJwtToken()
    );
    let userEmail = decodedToken['email'];
    this.emailVerificationService.sendVerificationEmail(userEmail);
  }

  redirectUrl: Signal<string> = computed(() => this.appService.redirectUrl());
}
