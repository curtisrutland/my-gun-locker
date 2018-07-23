import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gun } from '../../../models';
import { LockerService } from '../../../services';
import { faPen } from '@fortawesome/free-solid-svg-icons';

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
  newPrimaryFile: File = null;
  loading = false;
  icon = faPen;

  get canSubmit() {
    if (this.loading) { return false; }
    if (!this.gun) { return false; }
    const textFieldsDirty = this.serial !== this.gun.serial
      || this.name !== this.gun.name
      || this.details !== this.gun.details
      || this.notes !== this.gun.notes;
    if (textFieldsDirty) return true;
    if (this.newPrimaryFile) return true;
    return false;
  }

  get buttonClass() {
    const classes = ["button", "is-info", "is-rounded"];
    if (this.loading) classes.push("is-loading");
    return classes;
  }

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

  primaryImageChanged(event: Event) {
    const target = <HTMLInputElement>event.target;
    if (target.files && target.files.length > 0) {
      this.newPrimaryFile = target.files[0];
    } else {
      this.newPrimaryFile = null;
    }
  }

  async submit() {
    const d = new Date().toISOString();
    this.gun.serial = this.serial;
    this.gun.name = this.name;
    this.gun.details = this.details;
    this.gun.notes = this.notes;
    this.gun.modifiedOn = d;
    try {
      this.loading = true;
      await this.lockerService.updateGun(this.gun, this.newPrimaryFile);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
      this.router.navigate(["/locker"]);
    }
  }
}