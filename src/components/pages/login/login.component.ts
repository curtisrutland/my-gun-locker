import { Component, OnInit } from '@angular/core';
import { UserService, NavbarService } from '../../../services';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'mgl-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public user: UserService, public navbar: NavbarService) {}

  warning = faExclamationTriangle;

  login() {
    this.user.logIn();
  }

  ngOnInit() {
    this.navbar.clearActions();
  }

}