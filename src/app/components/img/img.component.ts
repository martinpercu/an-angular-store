import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = "./assets/images/default.png";

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
