import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b-modal',
  templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnInit {

  @Input('active') active: boolean = false;

  constructor() { }

  get classes() {
    return this.active ? ["modal", "is-active"] : ["modal"];
  }

  ngOnInit() { }
}