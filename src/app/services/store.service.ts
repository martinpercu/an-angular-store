import { Injectable } from '@angular/core';

import { Product } from '../models/product.model'


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];


  constructor() { }


  addToShoppingCart(product: Product) {
    // console.log(product)
    this.myShoppingCart.push(product)
    // console.log(this.myShoppingCart)
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
  }
}
