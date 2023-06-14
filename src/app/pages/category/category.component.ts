import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { ProductsService } from './../../services/products.service';
import { Product } from '../../models/product.model'

@Component({
  selector: 'app-category',
  // templateUrl: './category.component.html',
  template: `<app-products [products]="products" (loadMore)="loadMoreProducts()"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if(this.categoryId) {
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      })
    )
    .subscribe((data) => {
      this.products = data
    });
  }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     this.categoryId = params.get('id');
  //     if(this.categoryId) {
  //       console.log(this.categoryId);
  //       this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
  //       .subscribe(data => {
  //         this.products = data;
  //       })
  //     }
  //   });
  // }


  loadMoreProducts() {
    if(this.categoryId) {
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += 6;
      })
    }
  }



}
