import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { UsersService } from '../users/users.service';
import { LoginService } from '../login/login.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UsersService);
  const loginService = inject(LoginService);

  //if the user is logged in
  if (authService.isAuthenticated()) {
    //get full information about the user
    //by decoding the Jwt access token
    userService.decodeJwtToken();

    return true;
  }

  // User is not authenticated, redirect to the login page
  //and preserve the attempted URL by saving it
  loginService.redirectUrl.set(state.url);
  return router.createUrlTree(['/login']);
};
// export class AuthGuard {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivateFn(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     }

//     // User is not authenticated, redirect to the login page
//     //and preserve the attempted URL as a query parameter
//     return this.router.createUrlTree(['/login'], {
//       queryParams: {
//         returnUrl: state.url,
//       },
//     });
//   }
// }
