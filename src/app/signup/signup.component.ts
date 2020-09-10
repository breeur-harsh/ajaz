import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Custom made services
import { AuthService } from '../auth.service';

interface userDataStructure {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  organization: string;
  city: any;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, DoCheck {
  signupForm: FormGroup;
  http: HttpClient;
  error: String = null;
  passwordMatch: boolean = false;

  constructor(private signupAuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm_password: new FormControl(null, Validators.required),
      organization: new FormControl(null),
      city: new FormControl(null),
    });
  }

  ngDoCheck() {
    let password: string = this.signupForm.value.password;
    let confirmPassword: string = this.signupForm.value.confirm_password;
    this.passwordMatch = password === confirmPassword;
  }

  onSignUpSubmit() {
    let userData: userDataStructure = this.signupForm.value;
    if (this.passwordMatch) {
      this.signupAuthService
        .signup(userData.email, userData.password)
        .subscribe(
          (responseData) => {
            console.log(responseData);
            this.router.navigate(['/dashboard']);
          },
          (errorRes) => {
            this.error = errorRes;
          }
        );
    } else {
      this.error = 'Password and confirm password did not matched';
    }
  }
}
