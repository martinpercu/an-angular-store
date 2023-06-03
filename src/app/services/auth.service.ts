import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // // this URL with ${environments} is OK
  // // Allow to use development and prod URLs
  // private apiUrl = `${environment.API_URL}/api/auth`;


  // this URL is OK but now we are using the proxy
  // ng serve
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';



  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password});
  }

  profile() {
    return this.http.get(`${this.apiUrl}/profile`);
  }


}

