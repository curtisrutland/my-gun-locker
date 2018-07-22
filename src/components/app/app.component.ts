import { Component, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = true;
  user: User;
  constructor(public userService: UserService, public cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.loading = !user.loaded;
      this.user = user;
      this.cd.detectChanges();
    });
  }
}
