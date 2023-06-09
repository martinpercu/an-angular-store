import { Component } from '@angular/core';

// import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'an-angular-store';
  imgParent = 'https://images.indepth.dev/images/2022/07/ava.jpg';
  // imgParent = '';
  showImg = true;
  token = '';
  imageRta = '';

  constructor(
    // private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService

    ) {

  }


  onLoaded(img: string) {
    console.log('loaded in PARENT ', img)
  }

  toggleImage() {
    this.showImg = !this.showImg
  }

  createUser() {
    this.usersService.create({
      name: 'Martin',
      email: 'martin@supermail.com',
      password: '19801980'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  // login() {
  //   this.authService.login('martin@supermail.com', '19801980')
  //   .subscribe(rta => {
  //     console.log(rta); // the rta is the row answer for the token
  //     console.log(rta.access_token); // ass the answer is typed with Auth in the service rta.access_token IS the token itself
  //     this.token = rta.access_token;
  //   });
  // }

  // getProfile() {
  //   this.authService.profile(this.token)
  //   .subscribe(profile => {
  //     console.log(profile);
  //   });
  // }

  downloadPdf() {
    this.filesService.getFile('my-new-PDF.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imageRta = rta.location;
      });
    }
  }


}
