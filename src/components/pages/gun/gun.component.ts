import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gun } from '../../../models';
import { LockerService, NavbarService } from '../../../services';
import { faPen, faCaretDown, faCaretRight, faImages } from '@fortawesome/free-solid-svg-icons';
import { CardAction } from '../../../models/cardAction';

@Component({
  selector: 'mgl-gun',
  templateUrl: 'gun.component.html',
  styleUrls: ['gun.component.scss']
})

export class GunComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public locker: LockerService,
    public navbar: NavbarService
  ) { }

  gun: Gun = null;
  serial: string = "";
  name: string = "";
  details: string = "";
  notes: string = "";
  newPrimaryFile: File = null;
  loading = false;
  notesVisible = false;
  pen = faPen;

  get notesIcon() {
    return this.notesVisible ? faCaretDown : faCaretRight;
  }

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

  get gunName() {
    return this.gun ? this.gun.name : "Loading...";
  }

  get photoCardActions(): CardAction[] {
    if (!this.gun) return [];
    let imgCount = this.gun.photos ? this.gun.photos.length : 0
    if (this.gun.primaryPhoto) {
      imgCount++;
    }
    return [{
      icon: faImages,
      text: `More Images (${imgCount})`,
      action: () => this.router.navigate(['/p', this.gun.id])
    }];
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    try {
      const gun = await this.locker.getGun(id);
      this.gun = gun;
      this.serial = gun.serial;
      this.name = gun.name;
      this.details = gun.details;
      this.notes = gun.notes;
      this.navbar.setActions([
        { text: "My Locker", action: ['/'] },
        { text: "More Photos", action: ['/p', this.gun.id ]}
      ]);
    } catch (err) {
      this.router.navigate(["/"]);
    }
  }

  primaryImageChanged(files: File[]) {
    if (files) {
      this.newPrimaryFile = files[0];
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
      await this.locker.updateGun(this.gun, this.newPrimaryFile);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
      this.router.navigate(["/"]);
    }
  }

  toggleNotes() {
    this.notesVisible = !this.notesVisible;
  }
}