import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface signupAuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: "root"
})
export class signupAuthService {

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    //used interface for return type for intellisense
    return this.http.post<signupAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4mMQJCE6p3IQgFwsz5uwzgglAd29HQOk', {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}
