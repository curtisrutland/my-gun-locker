import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[b-btn]' })
export class ButtonDirective {
  @Input('b-btn') typeList: string;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const cl = this.el.nativeElement.classList;
    const classList = this.typeList.trim().split(' ').map(c => `is-${c}`);
    cl.add('button');
    classList.forEach(c => cl.add(c));
  }
}