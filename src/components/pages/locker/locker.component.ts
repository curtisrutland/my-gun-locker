import { Component, OnInit } from '@angular/core';
import { LockerService } from '../../../services';

@Component({
  selector: 'mgl-locker',
  templateUrl: 'locker.component.html',
  styleUrls: ['locker.component.scss']
})
export class LockerComponent implements OnInit {
  constructor(public lockerService: LockerService) { }

  ngOnInit() {
    this.lockerService.guns$.subscribe(g => {
      console.log(g);
      if(g.length < 7) {
        this.lockerService.createTestGun();
      }
    });
  }
}