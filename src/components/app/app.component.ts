import { Component, ChangeDetectorRef } from '@angular/core';
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
    public cd: ChangeDetectorRef,
    public router: Router) { }

  loggedIn = false;

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.loggedIn = user.loggedIn;
      this.cd.detectChanges();
    });
  }
}
