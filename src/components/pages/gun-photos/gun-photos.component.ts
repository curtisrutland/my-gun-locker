import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gun } from '../../../models';
import { LockerService } from '../../../services';
import { PhotoWrapper, Photo } from '../../../models/photo';
import { chunkArray } from '../../../helpers/functions';
import { CardAction } from '../../../models/cardAction';
import { faTimes, faAsterisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mgl-gun-photos',
  templateUrl: 'gun-photos.component.html',
  styleUrls: ['gun-photos.component.scss']
})

export class GunPhotosComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public lockerService: LockerService
  ) { }

  id: string;
  gun: Gun = null;
  photos: PhotoWrapper[][] = [];
  showDeleteModal = false;
  showSetPrimaryModal = false;
  photoPendingAction: Photo = null;

  async ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.id = this.route.snapshot.paramMap.get("id");
    try {
      await this.getGun();
    } catch (err) {
      this.router.navigate(["/"]);
    }
  }

  private async getGun() {
    const gun = await this.lockerService.getGun(this.id);
    let photos: PhotoWrapper[] = [];
    if (gun.photos && gun.photos.length) {
      photos = gun.photos.map(p => new PhotoWrapper(p, false, this.createActions(p)));
    }
    if (gun.primaryPhoto) {
      photos.unshift(new PhotoWrapper(gun.primaryPhoto, true, this.createActions(gun.primaryPhoto, true)));
    }
    this.photos = chunkArray(photos, 3);
    this.gun = gun;
  }

  private createActions(p: Photo, isPrimary = false): CardAction[] {
    const actions: CardAction[] = [{
      text: "Delete",
      icon: faTimes,
      action: () => this.deletePhoto(p)
    }];
    if (!isPrimary) {
      actions.push({
        text: "Set Primary",
        icon: faAsterisk,
        action: () => this.setPrimary(p)
      })
    }
    return actions;
  }

  private deletePhoto(photo: Photo) {
    this.photoPendingAction = photo;
    this.showDeleteModal = true;
  }

  onDeleteModalResult(result: boolean) {
    if (result) {
      console.log("delete", this.photoPendingAction);
    }
    this.showDeleteModal = false;
    this.photoPendingAction = null;
  }

  private setPrimary(photo: Photo) {
    console.log("set primary", photo);
  }
}