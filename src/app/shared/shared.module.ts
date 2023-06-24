import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SwiperModule } from 'swiper/angular';


import { ImgComponent } from '../shared/components/img/img.component';

import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { VocalsToNumbersPipe } from './pipes/vocals-to-numbers.pipe';
import { HighlightDirective } from './directives/highlight.directive';



@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    VocalsToNumbersPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    VocalsToNumbersPipe,
    HighlightDirective
  ]
})
export class SharedModule { }
