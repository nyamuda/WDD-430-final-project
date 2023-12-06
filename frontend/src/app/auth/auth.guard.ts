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
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '../app.service';
import { User } from '../users/user.model';

//Guard for logged in routes
export const loggedInAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UsersService);
  const jwtHelper = inject(JwtHelperService);
  const appService = inject(AppService);

  //if the user is logged in
  if (authService.isAuthenticated()) {
    //get full information about the user
    //by decoding the Jwt access token
    userService.decodeJwtToken();

    return true;
  } else {
    // User is not authenticated, redirect to the login page
    //and preserve the attempted URL by saving it
    appService.storeRedirectUrl(state.url);
    return router.createUrlTree(['/login']);
  }
};

//Guard for admin routes
export const adminAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UsersService);
  const appService = inject(AppService);

  //if the user is logged in
  if (authService.isAdmin()) {
    //get full information about the user
    //by decoding the Jwt access token
    userService.decodeJwtToken();

    return true;
  }

  // User is not admin redirect to the login page
  //and preserve the attempted URL by saving it
  appService.storeRedirectUrl(state.url);
  return router.navigateByUrl('/admin');
};

/*Guard for the right user account routes
Example: for a user to edit or see user details
the ID of the user from the token
must match the ID of the user they're trying to edit or see */
export const rightUserAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UsersService);
  const appService = inject(AppService);
  const jwtHelper = inject(JwtHelperService);
  const loggedInUserId = authService.getTokenInfo()['userId'];
  const paramValue = route.params['id'];

  //if the user is logged in and it's the right user
  if (authService.isAuthenticated() && paramValue === loggedInUserId) {
    //get full information about the user
    //by decoding the Jwt access token
    userService.decodeJwtToken();

    return true;
  }

  // User is not admin redirect to the login page
  //and preserve the attempted URL by saving it
  appService.storeRedirectUrl(state.url);
  return router.navigateByUrl('/login');
};
