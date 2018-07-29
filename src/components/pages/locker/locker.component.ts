import { Component, OnInit } from '@angular/core';
import { LockerService, NavbarService } from '../../../services';
import { Gun } from '../../../models';


@Component({
  selector: 'mgl-locker',
  templateUrl: 'locker.component.html',
  styleUrls: ['locker.component.scss']
})
export class LockerComponent implements OnInit {
  constructor(public locker: LockerService, public navbar: NavbarService) { }

  guns: Gun[] = [];

  ngOnInit() {
    this.locker.guns$.subscribe(guns => {
      this.guns = guns;
    });
    this.navbar.clearActions();
  }
}

