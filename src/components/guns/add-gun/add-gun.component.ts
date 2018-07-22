import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mgl-add-gun',
  templateUrl: 'add-gun.component.html'
})

export class AddGunComponent implements OnInit {

  plus = faPlus;
  
  ngOnInit() { }
}