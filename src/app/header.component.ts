import { Component, Signal, computed } from '@angular/core';
import { LoginService } from './login/login.service';
import { AuthService } from './auth/auth.service';
import { RouterLinkActive } from '@angular/router';
import { User } from './users/user.model';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isOpen: boolean = false;
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  logout() {
    this.loginService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  user: Signal<User> = computed(() => this.userService.user());
}
