import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service'

import { Product } from '../../models/product.model'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products: Product[] = [];
  limit = 10;
  offset = 0;


  constructor(
    private productsService: ProductsService
  ) { }



  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(data)
    })
  }


  loadMoreProducts() {
    // console.log('Start offset loadMoreProducts ==> ', this.offset);
    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      // console.log(data);
      this.offset += 10;
      // console.log('END offset loadMoreProducts ==> ', this.offset);
    })
  }

}
