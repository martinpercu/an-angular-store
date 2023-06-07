import { Component } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  activeMenu = false;
  counter = 0;
  // token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu
  }

  login() {
    this.authService.loginAndGet('martin@supermail.com', '19801980')
    .subscribe(user => {
      this.profile = user;
      // this.token = '-invented-to-work-in-html-';
    })
    // .subscribe(rta => {
    //   console.log(rta); // the rta is the row answer for the token
    //   console.log(rta.access_token); // ass the answer is typed with Auth in the service rta.access_token IS the token itself
    //   this.token = rta.access_token;
    // })
    ;
  }

  // getProfile() {
  //   this.authService.profile()
  //   .subscribe(user => {
  //     console.log(user);
  //     this.profile = user;
  //   });
  // }

}
