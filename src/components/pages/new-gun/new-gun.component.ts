import { Component, OnInit } from '@angular/core';
import { Gun } from '../../../models';
import { LockerService } from '../../../services';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mgl-new-gun',
  templateUrl: 'new-gun.component.html',
  styleUrls: ['new-gun.component.scss']
})

export class NewGunComponent implements OnInit {
  constructor(
    private lockerService: LockerService,
    private router: Router
  ) { }

  serial: string = "";
  name: string = "";
  details: string = "";
  notes: string = "";
  loading = false;
  plus = faPlus;
  primaryImage: File = null;

  get canSubmit() {
    if (this.loading)
      return false;
    return !!this.serial.trim()
      && !!this.name.trim()
      && this.details.trim();
  }

  get buttonClass() {
    const classes = ["button", "is-info", "is-rounded"];
    if(this.loading) classes.push("is-loading");
    return classes;
  }

  ngOnInit() { }

  primaryImageChanged(event: Event) {
    const target = <HTMLInputElement>event.target;
    if(target.files && target.files.length > 0) {
      this.primaryImage = target.files[0];
    } else {
      this.primaryImage = null;
    }
  }

  async submit() {
    const d = new Date().toISOString();
    const gun: Gun = {
      id: this.lockerService.getId(),
      serial: this.serial.trim(),
      name: this.name.trim(),
      details: this.details.trim(),
      notes: this.notes.trim(),
      createdOn: d,
      modifiedOn: d
    };
    try {
      this.loading = true;
      await this.lockerService.createGun(gun, this.primaryImage);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
      this.router.navigate(["/"]);
    }
  }
}