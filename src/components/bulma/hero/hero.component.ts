import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b-hero',
  templateUrl: 'hero.component.html'
})

export class HeroComponent implements OnInit {
  @Input() is: string = "success bold";
  @Input() title: string = "My Gun Locker";
  @Input() subtitle: string = "Your virtual gun locker. Store pictures and serial numbers securely in the cloud.";
  @Input() hideSubtitle: boolean = false;

  get classes() {
    return ["hero", ...this.is.trim().split(' ').map(is => `is-${is}`)]
  }

  constructor() { }

  ngOnInit() {
  }
}