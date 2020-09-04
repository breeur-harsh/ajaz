import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private http: HttpClient) { }

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
    let userData: { name: string; email: string; password: string; confirm_password: string; organization: string; city: any } = this.signupForm.value;
    this.http.post('https://ajaz-39d9e.firebaseio.com/users.json', userData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

}
