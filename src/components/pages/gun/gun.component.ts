import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gun } from '../../../models';
import { LockerService } from '../../../services';

@Component({
  selector: 'mgl-gun',
  templateUrl: 'gun.component.html',
  styleUrls: ['gun.component.scss']
})

export class GunComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public lockerService: LockerService
  ) { }

  get gunName() {
    return this.gun ? this.gun.name : "Loading...";
  }

  gun: Gun = null;
  serial: string = "";
  name: string = "";
  details: string = "";
  notes: string = "";

  async ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    const id = this.route.snapshot.paramMap.get("id");
    try {
      const gun = await this.lockerService.getGun(id);
      this.gun = gun;
      this.serial = gun.serial;
      this.name = gun.name;
      this.details = gun.details;
      this.notes = gun.notes;
    } catch (err) {
      this.router.navigate(["/"]);
    }
  }
}