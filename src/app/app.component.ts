import { Component, OnInit } from '@angular/core';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mdb-angular-ui-kit-free';

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    //load user information if they're logged in
    //by decoding the access token
    this.userService.decodeJwtToken();
  }
}
