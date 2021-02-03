import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  RouterState,
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

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Gets the state in the route
    const routeState = this.router.getCurrentNavigation().extras
      .state as SignInCredentialsModel;

    // Checks for authentication
    const isAuthenticated = await this.authenticationService.login(routeState);

    if (isAuthenticated) {
      // The user is authenticated, the guard returns true
      return isAuthenticated;
    } else {
      // If the user is not authenticated then navigate to the sign-in page
      this.router.navigate(['sing-in']);
    }
  }
}
