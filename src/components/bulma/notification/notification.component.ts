import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b-notification',
  templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit {
  constructor() { }

  @Input() type: string = "warning";

  get classes() {
    return ["notification", `is-${this.type}`];
  }

  ngOnInit() { }
}