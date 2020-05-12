import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean;
    // store the URL so we can redirect after logging in
  redirectUrl: string;

  errorMessage: string;

  

}