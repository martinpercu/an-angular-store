import { Component, OnInit } from '@angular/core';

import { OnExit } from './../../../guards/exit.guard';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  // ngOnInit(): void {

  // }

  onExit() {
    const rta = confirm('from register vous voulez partir ?');
    return rta
  }



}
