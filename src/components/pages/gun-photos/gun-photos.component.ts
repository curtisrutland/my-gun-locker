import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gun } from '../../../models';
import { LockerService } from '../../../services';
import { PhotoWrapper, Photo } from '../../../models/photo';
import { chunkArray } from '../../../helpers/functions';
import { CardAction } from '../../../models/cardAction';
import { faTimes, faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { PhotoChooserComponent } from '../../photo-chooser/photo-chooser.component';

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

  @ViewChild(PhotoChooserComponent) photoChooser: PhotoChooserComponent;

  id: string;
  gun: Gun = null;
  photos: PhotoWrapper[][] = [];
  showDeleteModal = false;
  showSetPrimaryModal = false;
  showUpdatingModal = false;
  photoPendingAction: Photo = null;
  updatingModalMessage = "";
  imagesPendingUpload: File[] = null;
  uploading = false;
  uploadsCompleted = 0;
  uploads = 0;

  get canUpload() {
    return !this.uploading && this.imagesPendingUpload != null && this.imagesPendingUpload.length > 0;
  }

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

  async upload() {
    this.uploading = true;
    this.uploads = this.imagesPendingUpload.length;
    this.uploadsCompleted = 0;
    this.lockerService.addGunImages(this.gun, this.imagesPendingUpload).subscribe({
      next: n => this.uploadsCompleted++,
      complete: async () => {
        await this.getGun();
        this.uploading = false;
        this.uploads = 0;
        this.imagesPendingUpload = null;
        this.photoChooser.clear();
      }
    })
  }

  private deletePhoto(photo: Photo) {
    this.photoPendingAction = photo;
    this.showDeleteModal = true;
  }

  async onDeleteModalResult(result: boolean) {
    this.showDeleteModal = false;
    if (result) {
      this.showUpdateMessage("Deleting photo...");
      await this.lockerService.deleteGunPhoto(this.gun, this.photoPendingAction);
      await this.getGun();
      this.showUpdateMessage(false);
    }
    this.photoPendingAction = null;
  }

  private setPrimary(photo: Photo) {
    this.photoPendingAction = photo;
    this.showSetPrimaryModal = true;
  }

  async onSetPrimaryModalResult(result: boolean) {
    this.showSetPrimaryModal = false;
    if (result) {
      this.showUpdateMessage("Updating primary photo...");
      await this.lockerService.updateGunPrimaryPhoto(this.gun, this.photoPendingAction);
      await this.getGun();
      this.showUpdateMessage(false);
    }
    this.photoPendingAction = null;
  }

  addPhotos(images: File[]) {
    this.imagesPendingUpload = images;
  }

  private showUpdateMessage(show: string | boolean) {
    if (!show) {
      this.showUpdatingModal = false;
    } else {
      this.updatingModalMessage = <string>show;
      this.showUpdatingModal = true;
    }
  }
}