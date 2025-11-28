import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


import { environment } from './../../environments/environment';

import { Category } from './../models/category.model';




@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  // // this URL with ${environments} is OK
  // // Allow to use development and prod URLs
  // private apiUrl = `${environment.API_URL}/api/products`;


  // this URL is OK if we use the PROXY ==> use it running:
  // ng serve --proxy-config ./proxy.config.json
  // OR
  // npm run start:proxy
  // private apiUrl = '/api/products';


  // this URL is OK but now we are using the proxy
  // ng serve
  // private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/products';
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  // private apiUrlForCategories = 'https://damp-spire-59848.herokuapp.com/api/categories';
  private apiUrlForCategories = 'https://api.escuelajs.co/api/v1/categories';



  // the next URL is WRONG ==>  just to try "retry and pipes"
  // private apiUrl = 'https://young-sands-07814.herokusdfapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }


  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Category[]>(this.apiUrlForCategories, { params })
  }


}
