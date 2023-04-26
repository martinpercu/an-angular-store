import { Component } from '@angular/core';

import { Product } from '../../models/product.model'

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  total = 0;
  myShoppingCart: Product[] = [];

  products: Product[] = [];
  today = new Date();
  otherDate = new Date(2022, 11, 18);



  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(data)
    })
  }

  onAddToShoppingCart(product: Product) {
    console.log(product)
    this.storeService.addToShoppingCart(product)
    console.log(this.myShoppingCart)
    this.total = this.storeService.getTotal()
    console.log(this.total)
  }

}
