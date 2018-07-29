import { Component, OnInit, HostListener } from '@angular/core';
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { timer, BehaviorSubject } from "rxjs";
import { debounce } from "rxjs/operators";

@Component({
  selector: 'mgl-scroll-top',
  templateUrl: 'scroll-top.component.html',
  styleUrls: ['scroll-top.component.scss']
})

export class ScrollTopComponent implements OnInit {

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this._visible.next(window.pageYOffset > 5);
  }

  private _visible = new BehaviorSubject(false);
  visible$ = this._visible
    .asObservable().pipe(debounce(() => timer(200)));

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