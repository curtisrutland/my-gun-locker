import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: '[mgl-photo-chooser]',
  templateUrl: 'photo-chooser.component.html',
  styleUrls: ['photo-chooser.component.scss']
})

export class PhotoChooserComponent implements OnInit {

  @Input('mgl-photo-chooser') label = "Choose A Photo";
  @Input('multiple') multiple = false;
  @Output('files') files = new EventEmitter<File[]>();
  @ViewChild('input') input: ElementRef;

  constructor() { }

  ngOnInit() { }

  imagesChanged(event: Event) {
    const target = <HTMLInputElement>event.target;
    if (target.files && target.files.length > 0) {
      this.files.emit(Array.from(target.files));
    } else {
      this.files.emit(null);
    }
  }

  clear() {
    this.input.nativeElement.value = null;
  }
}