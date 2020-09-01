import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'confirm_password': new FormControl(null, Validators.required),
      'organization': new FormControl(null),
      'city': new FormControl(null),
    });

  }

  onSubmit() {
    console.log(this.signupForm);
  }

}
