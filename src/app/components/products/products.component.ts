import { Component } from '@angular/core';

import { Product } from '../../models/product.model'

import { StoreService } from '../../services/store.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  total = 0;
  myShoppingCart: Product[] = [];


  products: Product[] = [
    {
        id: 1,
        name: 'Arbol-Vida',
        price: 230,
        image: './assets/images/products/arbolvida.jpg'
    },
    {
        id: 2,
        name: 'Chronos',
        price: 275,
        image: './assets/images/products/chronos.jpg'
    },
    {
        id: 3,
        name: 'Descendence',
        price: 185,
        image: './assets/images/products/descendence.jpg'
    },
    {
        id: 4,
        name: 'Genesis',
        price: 180,
        image: './assets/images/products/genesis.jpg'
    },
    {
        id: 5,
        name: 'Infinit',
        price: 190,
        image: './assets/images/products/infinit.jpg'
    },
    {
        id: 6,
        name: 'Kaosnomos',
        price: 155,
        image: './assets/images/products/kaosnomos.jpg'
    },
    {
        id: 7,
        name: 'Meditation du Oiseau',
        price: 310,
        image: './assets/images/products/meditation.jpg'
    },
    {
        id: 8,
        name: 'Oiseau Rare',
        price: 220,
        image: './assets/images/products/oisseaurare.jpg'
    },
    {
        id: 9,
        name: 'Voyage',
        price: 255,
        image: './assets/images/products/voyage.jpg'
    }
  ];

  constructor(
    private storeService: StoreService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    console.log(product)
    this.storeService.addToShoppingCart(product)
    console.log(this.myShoppingCart)
    this.total = this.storeService.getTotal()
    console.log(this.total)
  }

}
