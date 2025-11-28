import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { TokenService } from './../services/token.service';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // // this URL with ${environments} is OK
  // // Allow to use development and prod URLs
  // private apiUrl = `${environment.API_URL}/api/auth`;


  // this URL is OK but now we are using the proxy
  // ng serve
  // private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/auth';
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth';

  private user = new BehaviorSubject<User | null>(null);

  user$ = this.user.asObservable();


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }


  // profile(token: string) {
  //   // if we want more flexibility we can use a "const headers" as follow
  //   // const headers = new HttpHeaders();
  //   // headers.set('Authorization', `Bearer ${token}`);
  //   return this.http.get<User>(`${this.apiUrl}/profile`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       // 'Content-type': 'application/json'
  //     }
  //   });
  // }


  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  profile() {
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   // 'Content-type': 'application/json'
      // }
    });
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user => this.user.next(user))
    );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile())
    )
  }

  logout() {
    this.tokenService.removeToken();
  }


}

