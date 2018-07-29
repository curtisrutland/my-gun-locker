import { Component, OnInit } from '@angular/core';
import { LockerService } from '../../../services';
import { Gun } from '../../../models';


@Component({
  selector: 'mgl-locker',
  templateUrl: 'locker.component.html',
  styleUrls: ['locker.component.scss']
})
export class LockerComponent implements OnInit {
  constructor(public lockerService: LockerService) { }

  guns: Gun[] = [];

  ngOnInit() {
    this.lockerService.guns$.subscribe(guns => {
      this.guns = guns;
    });
  }
}

