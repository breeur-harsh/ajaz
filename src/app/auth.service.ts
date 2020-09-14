import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  required?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Variable that provides login status
  loggedIn: boolean = false;
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    //used interface for return type for intellisense
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4mMQJCE6p3IQgFwsz5uwzgglAd29HQOk',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  register(email: string, password: string) {
    return this.http.post('http://breeur.in/food/register.php', {
      email: email,
    })
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4mMQJCE6p3IQgFwsz5uwzgglAd29HQOk',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exist.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is invalid';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password';
        break;
    }
    return throwError(errorMessage);
  }
}
