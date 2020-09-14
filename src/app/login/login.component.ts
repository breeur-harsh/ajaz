import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onLoginSubmit() {
    let { email, password } = this.loginForm.value;
    this.AuthService.login(email, password).subscribe(
      (resData) => {
        this.AuthService.loggedIn = true;
        console.log(resData);
        this.router.navigate(['dashboard']);
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
