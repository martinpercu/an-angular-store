import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { User } from '../../../models/user.model';
import { Category } from '../../../models/category.model';

import { UsersService } from './../../../services/users.service';





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
  categories: Category[] = [];
  user: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu
  }

  createUser() {
    this.usersService.create({
      name: 'Martin',
      email: 'marto@mail.com',
      password: '19801980',
      role: 'customer'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  login() {
    this.authService.loginAndGet('marto@mail.com', '19801980')
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

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    });

  }

  logOutUser() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home'])
  }

}
