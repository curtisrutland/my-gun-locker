import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'mgl-about',
  templateUrl: 'about.component.html'
})

export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  get projectLink() { return environment.projectLink };
  get version() { return environment.version };
}