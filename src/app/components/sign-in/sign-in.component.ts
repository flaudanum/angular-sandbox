import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';
import { SignInCredentialsModel } from 'src/app/models/sign-in-credentials-model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  authenticationFailed = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.subscribeToNavigationEvents();
  }

  private subscribeToNavigationEvents() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof NavigationCancel
        )
      )
      .subscribe((event) => {
        const initialUrl = this.router
          .getCurrentNavigation()
          .initialUrl?.toString();
        const finalUrl = this.router
          .getCurrentNavigation()
          .finalUrl?.toString();

        const isNavigated: boolean =
          event instanceof NavigationEnd && finalUrl === '/sign-in';
        const isRedirected: boolean =
          event instanceof NavigationCancel && initialUrl === '/sign-in';
        const isExiting: boolean =
          event instanceof NavigationEnd && initialUrl == '/sign-in';

        // Explicit navigation
        if (isNavigated || isRedirected) {
          console.log('isNavigated: ' + isNavigated);
          console.log('isRedirected: ' + isRedirected);
          this.navigateToMainView({ login: '', password: '' }, () => {
            this.setBackgroundImage();
          });
        }
        if (isExiting) {
          this.removeBackgroundImage();
        }
      });
  }

  private subscribeToLogin() {}

  private setBackgroundImage() {
    // Sets a background image for sign in page
    const bodyElt = document.getElementsByTagName('body')[0];
    bodyElt.style.backgroundImage =
      "url('./assets/pictures/login-background.jpg')";
    bodyElt.style.backgroundSize = 'cover';
  }

  private removeBackgroundImage() {
    // Removes the background image of sign in page
    const bodyElt = document.getElementsByTagName('body')[0];
    bodyElt.style.backgroundImage = 'none';
  }

  ngOnInit(): void {
    this.setBackgroundImage();
  }

  onSubmit(signInForm: NgForm) {
    const credentials = {
      login: signInForm.value.login,
      password: signInForm.value.password,
    };

    this.navigateToMainView(credentials, () => {
      this.authenticationFailed = true;
    });
  }

  navigateToMainView(
    credentials: SignInCredentialsModel,
    rejectCallback: () => void
  ) {
    const obs = this.authenticationService.login(credentials);
    obs.subscribe((isAuthenticated) => {
      console.log('in subscription');

      if (isAuthenticated) {
        console.log('is Authenticated');

        this.router.navigate([''], {
          state: credentials,
        });
      } else {
        console.log('is rejected: ' + rejectCallback);
        rejectCallback();
      }
    });
    console.log('navigateToMainView:', credentials, obs);
  }
}
