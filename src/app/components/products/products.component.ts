import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from 'rxjs/operators'
import { zip } from 'rxjs'

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model'

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  // this vars under just for try pipes
  today = new Date();
  otherDate = new Date(2022, 11, 18);
  // this vars above just for try pipes

  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter();


  myShoppingCart: Product[] = [];
  total = 0;
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

  // limit = 10;
  // offset = 0;

  statusDetail: 'loading' | 'succes' | 'error' | 'init' = 'init'





  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  // ngOnInit(): void {
  //   this.productsService.getAllProducts().subscribe(data => {
  //     this.products = data;
  //     console.log(data)
  //   })
  // }

  // ngOnInit(): void {
  //   console.log('start offset ngOnInit ==> ', this.offset);
  //   this.productsService.getProductsByPage(10, 0)
  //   .subscribe(data => {
  //     this.products = data;
  //     console.log(data);
  //     this.offset += 10
  //     console.log('END offset ngOnInit ==> ', this.offset);
  //   })
  // }

  // ngOnInit(): void {
  //   this.productsService.getAllProducts().subscribe(data => {
  //     this.products = data;
  //     console.log(data)
  //   })
  // }

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
    this.statusDetail = 'init';
    this.toggleProductDetail();
    this.productsService.getProducts(id)
    .subscribe(data => {
      console.log('product ==> ', data);
      this.statusDetail = 'succes';
      this.productChosen = data;
    }, errorMsg => {
      console.log(errorMsg);
      // console.log(response.error.message); // just the message from Backend
      // if we catch the error in the products.service response.error.message fails
      // "cannot read properties of undefined (reading 'message')"
      this.statusDetail = 'error';
      window.alert(errorMsg)
    })
  }

  readAndUpdate(id: string) {
    this.productsService.getProducts(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'title-changed'})),
      switchMap((product) => this.productsService.update(product.id, {title: 'again-title-changed'})),
      switchMap((product) => this.productsService.update(product.id, {title: 'one-more-title-changed'}))
    )
    .subscribe(data => {
      console.log(data)
    });
    this.productsService.fetchReadAndUpdate(id, {title: 'change-again-title'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })

  }






  createNewProduct() {
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

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'nouveau nom produit',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      console.log('updated product =>' , data);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data; // this is needed to change also the productChose in slide
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(data => {
      console.log('updated product =>' , data);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

  // loadMoreProducts() {
  //   console.log('Start offset loadMoreProducts ==> ', this.offset);
  //   this.productsService.getProductsByPage(this.limit, this.offset)
  //   .subscribe(data => {
  //     this.products = this.products.concat(data);
  //     console.log(data);
  //     this.offset += 10;
  //     console.log('END offset loadMoreProducts ==> ', this.offset);
  //   })
  // }

  // Above works fine with getProductsByPage()
  // Under works directly with same function getAllProducts() ... this function has limit and offset OPTIONALS

  // loadMoreProducts() {
  //   console.log('Start offset loadMoreProducts ==> ', this.offset);
  //   this.productsService.getAllProducts(this.limit, this.offset)
  //   .subscribe(data => {
  //     this.products = this.products.concat(data);
  //     console.log(data);
  //     this.offset += 10;
  //     console.log('END offset loadMoreProducts ==> ', this.offset);
  //   })
  // }

  loadMoreProducts() {
    this.loadMore.emit();
  }

}
