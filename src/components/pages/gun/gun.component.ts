import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mgl-gun',
  templateUrl: 'gun.component.html',
  styleUrls: ['gun.component.scss']
})

export class GunComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() { }
}