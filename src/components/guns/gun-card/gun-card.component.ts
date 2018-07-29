import { Component, OnInit, Input } from '@angular/core';
import { Gun } from '../../../models';
import { faCopy, faCheck, faPen, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

declare var navigator: any;

@Component({
  selector: '[mgl-gun-card]',
  templateUrl: 'gun-card.component.html',
  styleUrls: ['gun-card.component.scss']
})

export class GunCardComponent implements OnInit {
  @Input('mgl-gun-card') gun: Gun;

  copyIcon = faCopy;
  penIcon = faPen;
  showClipboard = !!navigator.clipboard;

  get photoUrl() {
    if(this.gun.primaryPhoto){
      return this.gun.primaryPhoto.url;
    } else {
      return "/assets/pistol.jpg";
    }
  }

  constructor() { }

  ngOnInit() { }

  async copy() {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(this.gun.serial);
        console.log("copied");
        this.setTempIcon(faCheck);
      } catch (err) {
        console.log(err);
        this.setTempIcon(faExclamationTriangle);
      }
    } else {
      this.setTempIcon(faExclamationTriangle);
    }
  }

  private setTempIcon(icon) {
    this.copyIcon = icon;
    window.setTimeout(() => this.copyIcon = faCopy, 1500);
  }

}