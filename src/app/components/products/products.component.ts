import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO } from '../../models/product.model'

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
  productChosen: Product = {
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
      this.toggleProductDetail();
      console.log('product ==> ', data);
      this.productChosen = data;
    })
  }

  createNewPropduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo Prod',
      description: 'super classe produit pour tout le monde vraiment la nickel chrome qsdfkhqsdkf sdfdsf sdf s sdf hqsd',
      images: ['https://picsum.photos/300/200', 'https://picsum.photos/350/160', 'https://picsum.photos/200/300'],
      price: 34,
      categoryId: 1,
    }
    this.productsService.create(product)
    .subscribe(data => {
      console.log('Created ==> ', data);
      this.products.unshift(data)
    })
  }

}
