import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private loginAuthService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onLoginSubmit() {
    let { email, password } = this.loginForm.value;
    this.loginAuthService.login(email, password).subscribe(
      (resData) => {
        this.loginAuthService.loggedIn = true;
        console.log(this.loginAuthService.loggedIn);
        console.log(resData);
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
