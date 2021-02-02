import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const bodyElt = document.getElementsByTagName('body')[0];
    bodyElt.style.backgroundImage =
      "url('./assets/pictures/login-background.jpg')";
    bodyElt.style.backgroundSize = "cover";
  }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value.login);
    console.log(loginForm.value.password);
  }
}
