import { Component, OnInit, Output } from '@angular/core';
import { LockerService } from '../../../services';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mgl-add-gun',
  templateUrl: 'add-gun.component.html'
})

export class AddGunComponent implements OnInit {
  constructor(public lockerService: LockerService) { }

  plus = faPlusSquare;
  
  ngOnInit() { }

  createTestGuns() {
    for (let i = 0; i < 14; i++) {
      this.lockerService.createTestGun();
    }
  }
}