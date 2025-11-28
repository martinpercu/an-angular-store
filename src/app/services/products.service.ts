import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model'
import { checkTime } from './../interceptors/time.interceptor'

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

  // getAllProducts() {
  //   return this.http.get<Product[]>(this.apiUrl);
  // }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrlForCategories}/${categoryId}/products`, { params })
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
    .pipe(
      retry(2),
      map(products => products.map(item => {
        return {
        ...item,
        taxes: .14 * item.price
        }
      }))
    );
  }



  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getProducts(id),
      this.update(id, dto)
    )
  }





  // this is getProducts without "manage errors"
  // getProducts(id: string) {
  //   return this.http.get<Product>(`${this.apiUrl}/${id}`);
  // }





  getProducts(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError(() => ('Hey is a server error 500'))
        }
        if (error.status === 404) {
          return throwError(() => ('The product not exist'))
        }
        if (error.status === HttpStatusCode.Unauthorized) { // Just to use HttsStatusCode
          return throwError(() => ('You are not authorized is error 401 '))
        }
        if (error.status === HttpStatusCode.Conflict) { // Just to use HttsStatusCode
          return throwError(() => ('This is error 409 '))
        }
        return throwError(() => ('This is a default error'))
      })
    )
  }


  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    });
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }


}






  // products: Product[] = [
  //   {
  //       id: 1,
  //       name: 'Arbol-Vida',
  //       price: 230,
  //       image: './assets/images/products/arbolvida.jpg'
  //   },
  //   {
  //       id: 2,
  //       name: 'Chronos',
  //       price: 275,
  //       image: './assets/images/products/chronos.jpg'
  //   },
  //   {
  //       id: 3,
  //       name: 'Descendence',
  //       price: 185,
  //       image: './assets/images/products/descendence.jpg'
  //   },
  //   {
  //       id: 4,
  //       name: 'Genesis',
  //       price: 180,
  //       image: './assets/images/products/genesis.jpg'
  //   },
  //   {
  //       id: 5,
  //       name: 'Infinit',
  //       price: 190,
  //       image: './assets/images/products/infinit.jpg'
  //   },
  //   {
  //       id: 6,
  //       name: 'Kaosnomos',
  //       price: 155,
  //       image: './assets/images/products/kaosnomos.jpg'
  //   },
  //   {
  //       id: 7,
  //       name: 'Meditation du Oiseau',
  //       price: 310,
  //       image: './assets/images/products/meditation.jpg'
  //   },
  //   {
  //       id: 8,
  //       name: 'Oiseau Rare',
  //       price: 220,
  //       image: './assets/images/products/oisseaurare.jpg'
  //   },
  //   {
  //       id: 9,
  //       name: 'Voyage',
  //       price: 255,
  //       image: './assets/images/products/voyage.jpg'
  //   }
  // ];
