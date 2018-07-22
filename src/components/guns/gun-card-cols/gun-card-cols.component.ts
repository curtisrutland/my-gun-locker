import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Gun } from '../../../models';

@Component({
  selector: '[mgl-gun-card-cols]',
  templateUrl: 'gun-card-cols.component.html'
})

export class GunCardColsComponent implements OnInit {
  @Input('mgl-gun-card-cols') gunGroup: Gun[];

  constructor(private el: ElementRef) {
    this.el.nativeElement.classList.add("columns");
  }

  ngOnInit() { }
}