import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SignInCredentialsModel } from '../models/sign-in-credentials-model';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Gets the state in the route
    const routeState = this.router.getCurrentNavigation().extras
      .state as SignInCredentialsModel;

    // Checks for authentication
    this.authenticationService
      .login(routeState)
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          // If the user is not authenticated then navigate to the sign-in page
          console.log('AuthenticationGuard redirection to sign-in');
          this.router.navigate(['sign-in']);
        }
      });

    return this.authenticationService.login(routeState);
  }
}
