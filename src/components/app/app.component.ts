import { Component } from '@angular/core';
import { UserService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public userService: UserService,
    public router: Router) { }

  loggedIn = true;

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      if(user && user.loggedIn) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    });
  }
}
