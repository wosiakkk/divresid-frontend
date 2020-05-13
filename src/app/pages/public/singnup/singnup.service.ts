import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://192.168.0.4:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root',
  })
  export class SingnupService {
  
    constructor(private http: HttpClient) { }
 
    register(user): Observable<any> {
      return this.http.post(AUTH_API + 'signup', {
        username: user.username,
        email: user.email,
        password: user.password
      }, httpOptions);
    }
}