import { SimpleChanges } from '@angular/core';
import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  img = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg
    console.log('in SET changeImg() | change just this img ==> ' , this.img )
  }
  // @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = "./assets/images/default.png";
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    // before render
    // NO async -- once time
    console.log('constructor', 'imgValue ==> ', this.img)
  }

  ngOnChanges(changes: SimpleChanges) {
    // before render
    // changes inputs -- run multiple times
    console.log('ngOnChanges', 'imgValue ==> ', this.img)
    console.log('in ngOnChanges() | changes ==> ', changes); // I get here all the changes in inputs but I cant recognize witch one is changing
  }

  ngOnInit() {
    // before render
    // async - fetch - promise etc etc -- once time
    console.log('ngOnInit', 'imgValue ==> ', this.img)
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter')
    // }, 1000)
  }

  ngAfterViewInit() {
    // after render
    // hangler children
    console.log('ngAfterViewInit')
  }

  ngOnDestroy() {
    // delete
    console.log('ngOnDestroy')
    // window.clearInterval(this.counterFn)
  }



  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('loaded!')
    this.loaded.emit("this link is not resolved ==> " + this.img )
  }
  imgEmptyLoaded() {
    console.log('loaded-empty')
    this.loaded.emit("empty")
  }

}
