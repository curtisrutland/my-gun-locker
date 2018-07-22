import { Component, OnInit } from '@angular/core';
import { Gun } from '../../../models';
import { LockerService } from '../../../services';

@Component({
  selector: 'mgl-new-gun',
  templateUrl: 'new-gun.component.html',
  styleUrls: ['new-gun.component.scss']
})

export class NewGunComponent implements OnInit {
  constructor(
    private lockerService: LockerService
  ) { }

  serial: string = "";
  name: string = "";
  details: string = "";
  notes: string = "";
  loading = false;

  canSubmit = false;

  ngOnInit() { }

  change() {
    this.canSubmit = !!this.name;
    console.log(this.canSubmit);
    console.log(this.name);
  }

  async submit() {
    const gun: Gun = {
      id: this.lockerService.getId(),
      serial: this.serial,
      name: this.name,
      details: this.details,
      notes: this.notes
    };
    try {
      this.loading = true;
      await this.lockerService.createGun(gun);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}