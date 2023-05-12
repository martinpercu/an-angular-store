import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';


import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  // the next URL is WRONG ==>  just to try "retry and pipes"
  private apiUrl = 'https://young-sands-07814.herokusdfapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  // getAllProducts() {
  //   return this.http.get<Product[]>(this.apiUrl);
  // }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(4)
    );
  }


  getProducts(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
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
