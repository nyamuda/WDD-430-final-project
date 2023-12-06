import { Component, OnInit, Signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailVerificationService } from '../email-verification.service';
import { AppService } from '../../../app.service';
import { UsersService } from '../../../users/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-email-verification-result',
  templateUrl: './email-verification-result.component.html',
  styleUrls: ['./email-verification-result.component.scss'],
})
export class EmailVerificationResultComponent implements OnInit {
  success: boolean = false;
  token: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailVerificationService: EmailVerificationService,
    private appService: AppService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
      //if the token exists
      if (this.token) {
        //first get the ID of the user associated with that token
        let decodedToken = this.jwtHelper.decodeToken(this.token);
        let userId = decodedToken.userId;
        //then send the token to the database so that it can be verified
        this.emailVerificationService.verifyUser(userId, this.token);
      }

      //verification has failed
      else {
        this.emailVerificationService.status.set('verifying');
      }
    });
  }

  resendVerificationEmail() {
    this.emailVerificationService.sendVerificationEmail();
  }

  redirectUrl: Signal<string> = computed(() => this.appService.redirectUrl());

  result: Signal<string> = computed(() =>
    this.emailVerificationService.status()
  );

  continue() {
    this.router.navigateByUrl(this.redirectUrl());
  }
}
