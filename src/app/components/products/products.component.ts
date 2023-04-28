import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model'

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  // this vars under just for try pipes
  today = new Date();
  otherDate = new Date(2022, 11, 18);
  // this vars above just for try pipes

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;





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

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  getProductDetail(id: string) {
    console.log(id)
    this.productsService.getProducts(id).subscribe(data => {
      console.log('product ==> ', data)
    })
  }

}
