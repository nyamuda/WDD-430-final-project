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

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  //check if the user is logged in
  if (authService.isAuthenticated()) {
    return true;
  }

  // User is not authenticated, redirect to the login page
  //and preserve the attempted URL as a query parameter
  return router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: state.url,
    },
  });
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
