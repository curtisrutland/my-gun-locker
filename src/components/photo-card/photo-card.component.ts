import { Component, OnInit, Input } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mgl-photo-card',
  templateUrl: 'photo-card.component.html',
  styleUrls: ['photo-card.component.scss']
})

export class PhotoCardComponent implements OnInit {

  @Input() url: string;
  @Input() alt: string = "no alt text available";

  icon = faImage;

  constructor() { }

  ngOnInit() { }
}