import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../../services';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'mgl-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  constructor(public userService: UserService, router: Router) {
    // userService.user$.subscribe(u => {
    //   if(u.loaded && u.loggedIn) {
    //     router.navigate(['/']);
    //   }
    // });
  }

  warning = faExclamationTriangle;

  login() {
    this.userService.logIn();
  }

}