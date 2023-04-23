import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'an-angular-store';
  imgParent = 'https://images.indepth.dev/images/2022/07/ava.jpg';
  // imgParent = '';

  onLoaded(img: string) {
    console.log('loaded in PARENT ', img)
  }
}
