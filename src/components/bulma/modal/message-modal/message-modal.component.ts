import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mgl-message-modal',
  templateUrl: 'message-modal.component.html'
})

export class MessageModalComponent implements OnInit {

  @Input() show = false;
  @Input() is = "primary";
  @Input() message: string;
  
  constructor() { }

  ngOnInit() { }
}