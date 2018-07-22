import { Component, OnInit, Input } from '@angular/core';
import { Gun } from '../../../models';

@Component({
  selector: '[mgl-gun-card]',
  templateUrl: 'gun-card.component.html'
})

export class GunCardComponent implements OnInit {
  @Input('mgl-gun-card') gun: Gun; 

  constructor() { }

  ngOnInit() { }

}