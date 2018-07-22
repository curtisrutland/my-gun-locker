import { Component, OnInit } from '@angular/core';
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'mgl-scroll-top',
  templateUrl: 'scroll-top.component.html',
  styleUrls: ['scroll-top.component.scss']
})

export class ScrollTopComponent implements OnInit {
  constructor() { }

  icon = faCaretUp;

  ngOnInit() { }

  scroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}