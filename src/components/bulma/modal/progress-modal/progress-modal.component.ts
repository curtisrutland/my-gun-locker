import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mgl-progress-modal',
  templateUrl: 'progress-modal.component.html'
})

export class ProgressModalComponent implements OnInit {

  @Input() show = false;
  @Input() value = 0;
  @Input() max = 100;
  @Input() is = "primary";
  
  constructor() { }

  ngOnInit() { }
}