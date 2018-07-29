import { Component, OnInit } from '@angular/core';
import { LockerService } from '../../../services';
import { Gun } from '../../../models';
import { chunkArray } from '../../../helpers/functions';


@Component({
  selector: 'mgl-locker',
  templateUrl: 'locker.component.html',
  styleUrls: ['locker.component.scss']
})
export class LockerComponent implements OnInit {
  constructor(public lockerService: LockerService) { }

  //gunGroups: Gun[][] = [];
  guns: Gun[] = [];

  ngOnInit() {
    this.lockerService.guns$.subscribe(g => {
      //this.gunGroups = chunkArray(g, 3);
      this.guns = g;
    });
  }
}

