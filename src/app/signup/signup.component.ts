import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

// Custom made services
import { signupAuthService } from '../auth.service';

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
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  http: HttpClient;

  constructor(private signupService: signupAuthService, private router: Router, private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirm_password: new FormControl(null, Validators.required),
      organization: new FormControl(null),
      city: new FormControl(null),
    });
  }

  onSubmit() {
    console.log('signup form submit triggered')
    let userData: userDataStructure = this.signupForm.value;

    this.signupService
      .signup(userData.email, userData.password)
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['/dashboard'])
      }, error => {
          console.log(error);
      });

  }
}
