import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mgl-confirm',
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.component.scss']
})

export class ConfirmComponent implements OnInit {

  @Input('show') show: boolean = false;
  @Output('result') result = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  sendResult(r: boolean) {
    this.result.emit(r);
  }
}