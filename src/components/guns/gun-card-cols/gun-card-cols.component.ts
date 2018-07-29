import { Component, OnInit, Input } from '@angular/core';
import { Gun } from '../../../models';

@Component({
  selector: 'mgl-gun-card-cols',
  templateUrl: 'gun-card-cols.component.html'
})

export class GunCardColsComponent implements OnInit {
  @Input('guns') guns: Gun[];

  ngOnInit() { }
}