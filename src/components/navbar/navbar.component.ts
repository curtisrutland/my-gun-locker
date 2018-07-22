import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services';
import { User } from '../../models';


@Component({
  selector: 'mgl-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  constructor(public userService: UserService, public cd: ChangeDetectorRef) { }

  menuActive = false;
  dropdownActive = false;
  user: User;

  get classes() { return this.menuActive ? ["is-active"] : []; }
  get dropdownClasses() { return this.dropdownActive ? ["is-active"] : [] };
  get username() { return this.user ? this.user.name : null };

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
      this.cd.detectChanges();
    });
  }

  toggle() {
    this.menuActive = !this.menuActive;
  }

  toggleDropdown() {
    if (!this.user) return;
    this.dropdownActive = !this.dropdownActive;
    this.cd.detectChanges();
  }

  logout() {
    this.userService.logOut();
    this.dropdownActive = false;
    this.menuActive = false;
    this.cd.detectChanges();
  }
}