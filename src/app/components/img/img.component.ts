import { Component, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = "./assets/images/default.png";

  constructor() {
    // before render
    // NO async -- once time
    console.log('constructor', 'imgValue ==> ', this.img)
  }

  ngOnChanges() {
    // before render
    // changes inputs -- run multiple times
    console.log('ngOnChanges', 'imgValue ==> ', this.img)
  }

  ngOnInit() {
    // before render
    // async - fetch - promise etc etc -- once time
    console.log('ngOnInit', 'imgValue ==> ', this.img)
  }

  ngAfterViewInit() {
    // after render
    // hangler children
    console.log('ngAfterViewInit')
  }

  ngOnDestroy() {
    // delete
    console.log('ngOnDestroy')
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
