import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Gun } from '../../../models';

@Component({
  selector: '[mgl-gun-card-cols-container]',
  templateUrl: 'gun-card-cols-container.component.html'
})

export class GunCardColsContainerComponent implements OnInit {
  @Input('mgl-gun-card-cols-container') gunGroups: Gun[][];

  constructor(private el: ElementRef) {
    this.el.nativeElement.classList.add("section");
  }

  ngOnInit() { }
}