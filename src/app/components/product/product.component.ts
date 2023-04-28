import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    description: '',
    category: {
      id: 0,
      name: '',
      typeImg: '',
    },
    images: [],
  };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProductDetail = new EventEmitter<string>();

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

  onShowDetail() {
    this.showProductDetail.emit(this.product.id)
  }

}
