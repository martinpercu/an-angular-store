import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User, CreateUserDTO } from './../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // // this URL with ${environments} is OK
  // // Allow to use development and prod URLs
  // private apiUrl = `${environment.API_URL}/api/users`;


  // this URL is OK but now we are using the proxy
  // ng serve
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/users';



  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
