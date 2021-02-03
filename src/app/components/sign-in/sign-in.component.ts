import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Sets a background image for sign in page
    const bodyElt = document.getElementsByTagName('body')[0];
    bodyElt.style.backgroundImage =
      "url('./assets/pictures/login-background.jpg')";
    bodyElt.style.backgroundSize = 'cover';
  }

  onSubmit(signInForm: NgForm) {
    // Removes the background image of sign in page
    const bodyElt = document.getElementsByTagName('body')[0];
    bodyElt.style.backgroundImage = 'none';

    this.router.navigate([''], {
      state: {
        login: signInForm.value.login,
        password: signInForm.value.password,
      },
    });

    // const service = new AuthenticationService()
    // service.login({
    //   login: signInForm.value.login,
    //   password: signInForm.value.password
    // }).then((isLogged: Boolean) => {
    //   console.log("You are logged: " + isLogged)
    //   }).catch(err => console.error(err))
  }
}
