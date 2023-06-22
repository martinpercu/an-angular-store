import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

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
  productId: string | null = null;


  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(data)
    });
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log('the ID of product ==> ' + this.productId + ' <=== voici le productID');
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
