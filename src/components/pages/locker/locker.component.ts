import { Component, OnInit } from '@angular/core';
import { LockerService } from '../../../services';
import { Gun } from '../../../models';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mgl-locker',
  templateUrl: 'locker.component.html',
  styleUrls: ['locker.component.scss']
})
export class LockerComponent implements OnInit {
  constructor(public lockerService: LockerService) { }

  gunGroups: Gun[][] = [];
  plus = faPlusSquare;

  ngOnInit() {
    this.lockerService.guns$.subscribe(g => {
      console.log(g);
      this.gunGroups = this.chunkArray(g, 3);
    });
  }

  chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    var chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      let chunk = arr.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }

  createTests() {
    for (let i = 0; i < 7; i++) {
      this.lockerService.createTestGun();
    }
  }
}

