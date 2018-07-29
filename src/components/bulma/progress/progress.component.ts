import { Component, OnInit, Input } from '@angular/core';
import { bClasses } from '../../../helpers/functions';

@Component({
  selector: 'b-progress',
  template: `<progress class="progress" [max]="max" [value]="value" [ngClass]="classes"></progress>`,
  styles: [`
.progress::-webkit-progress-value {
  transition: width 0.5s ease;
}
  `]
})

export class ProgressComponent implements OnInit {
  @Input() max = 100;
  @Input() value = 0;
  @Input() is = "";

  get classes() {
    return bClasses("progress", this.is);
  }

  constructor() { }

  ngOnInit() { }
}