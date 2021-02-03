import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private router: Router) {
    router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof NavigationCancel
        )
      )
      .subscribe((event) => {
        const initialUrl = router.getCurrentNavigation().initialUrl.toString();
        const finalUrl = router.getCurrentNavigation().finalUrl.toString();

        const isNavigated: boolean =
          event instanceof NavigationEnd && finalUrl === '/sign-in';
        const isRedirected: boolean =
          event instanceof NavigationCancel && initialUrl === '/sign-in';
        const isExiting: boolean =
          event instanceof NavigationEnd && initialUrl == '/sign-in';

        // Explicit navigation
        if (isNavigated || isRedirected) {
          this.setBackgroundImage();
        }
        if (isExiting) {
          this.removeBackgroundImage();
        }
      });
  }

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
    this.removeBackgroundImage();

    this.router.navigate([''], {
      state: {
        login: signInForm.value.login,
        password: signInForm.value.password,
      },
    });
  }
}
