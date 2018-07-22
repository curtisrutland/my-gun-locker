import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: '[b-hero]',
  templateUrl: 'hero.component.html'
})

export class HeroComponent implements OnInit {
  @Input('b-hero') title: string;
  @Input() subtitle: string = null;
  @Input() is: string = "";

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const cl = this.el.nativeElement.classList;
    cl.add("hero");
    this.is.split(' ').map(c => `is-${c}`).forEach(c => cl.add(c));
  }
}