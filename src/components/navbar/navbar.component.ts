import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, NavbarService } from '../../services';
import { User } from '../../models';
import { NavAction } from '../../models/navAction';

@Component({
  selector: 'mgl-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  constructor(
    public userService: UserService,
    public navbarService: NavbarService,
    public router: Router
  ) { }

  menuActive = false;
  dropdownActive = false;
  user: User;
  actions$ = this.navbarService.actions$;

  get classes() { return this.menuActive ? ["is-active"] : []; }
  get dropdownClasses() { return this.dropdownActive ? ["is-active"] : [] };
  get username() { return this.user ? this.user.name : null };

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);
  }

  toggle() {
    this.menuActive = !this.menuActive;
  }

  toggleDropdown() {
    if (!this.user) return;
    this.dropdownActive = !this.dropdownActive;
  }

  logout() {
    this.userService.logOut();
    this.dropdownActive = false;
    this.menuActive = false;
  }

  actionClick(action: NavAction) {
    this.menuActive = false;
    if(typeof(action.action) === "function") {
      action.action();
    } else {
      this.router.navigate(action.action);
    }
  }
}