import { Component, OnInit } from '@angular/core';
import { EmailVerificationService } from './email-verification.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from '../users/users.service';

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
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      let token = params['token'];

      //if the token exists
      if (token) {
        //first get the ID of the user associated with that token
        let decodedToken = this.jwtHelper.decodeToken(token);
        let userId = decodedToken.userId;
        //then send the token to the database so that it can be verified
        this.emailVerificationService.verifyUser(userId, token);
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
}
