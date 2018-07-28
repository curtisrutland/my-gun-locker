import { Component, OnInit, Input } from '@angular/core';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { CardAction } from '../../models/cardAction';

@Component({
  selector: 'mgl-photo-card',
  templateUrl: 'photo-card.component.html',
  styleUrls: ['photo-card.component.scss']
})

export class PhotoCardComponent implements OnInit {

  @Input() url: string;
  @Input() alt: string = "no alt text available";
  @Input() actions: CardAction[] = [];

  icon = faImages;

  constructor() { }

  ngOnInit() { }
}