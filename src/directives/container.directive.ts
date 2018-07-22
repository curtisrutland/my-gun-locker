import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[b-container]' })
export class ContainerDirective {
  constructor(el: ElementRef) {
    el.nativeElement.classList.add('container');
 }
}