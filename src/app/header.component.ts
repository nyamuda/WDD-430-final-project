import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { AuthService } from './auth/auth.service';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isOpen: boolean = false;
  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  logout() {
    this.loginService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
