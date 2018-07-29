import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { AngularFireStorage } from 'angularfire2/storage';
import { UserService } from './user.service';
import { Gun, User } from '../models';
import { Subscription, BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from "rxjs/operators";
import { Photo } from '../models/photo';

@Injectable()
export class LockerService {

  constructor(
    public userService: UserService,
    public afs: AngularFirestore,
    public storage: AngularFireStorage
  ) {
    userService.user$.subscribe(user => this.userStateChanged(user));
  }

  private user: User;
  private gunsCollection: AngularFirestoreCollection<Gun>;
  private gunsCollectionSubscription: Subscription;
  private _gunsSubject = new BehaviorSubject<Gun[]>([]);

  guns$ = this._gunsSubject.asObservable();

  getId(): string {
    return this.afs.createId();
  }

  getGun(id: string): Promise<Gun> {
    let doc = this.gunsCollection.doc<Gun>(id);
    return new Promise<Gun>((res, rej) => {
      let sub = doc.valueChanges().subscribe(d => {
        if (d) res(d);
        else rej("not found");
        sub.unsubscribe();
      });
    });
  }

  async createGun(gun: Gun, primaryImage?: File) {
    if (!gun.id) gun.id = this.getId();
    const { id } = gun;
    if (primaryImage) {
      let primaryPhoto = await this.createFile(primaryImage, id);
      gun.primaryPhoto = primaryPhoto;
    }
    await this.gunsCollection.doc(id).set(gun);
  }

  async updateGun(gun: Gun, primaryImage?: File) {
    if (primaryImage) {
      if (gun.primaryPhoto) {
        if (!gun.photos) {
          gun.photos = [];
        }
        gun.photos.push(gun.primaryPhoto);
      }
      let primaryPhoto = await this.createFile(primaryImage, gun.id);
      gun.primaryPhoto = primaryPhoto;
    }
    await this.gunsCollection.doc(gun.id).update(gun);
  }

  async updateGunPrimaryPhoto(gun: Gun, primaryPhoto: Photo) {
    gun.photos = gun.photos.filter(p => p.id !== primaryPhoto.id);
    if (gun.primaryPhoto) {
      gun.photos.unshift(gun.primaryPhoto);
    }
    gun.primaryPhoto = primaryPhoto;
    await this.gunsCollection.doc(gun.id).update(gun);
  }

  async addGunPhotos(gun: Gun, photos: Photo[]) {
    if (gun.photos) {
      gun.photos = gun.photos.concat(photos);
    } else {
      gun.photos = photos;
    }
    await this.gunsCollection.doc(gun.id).update(gun);
  }

  async deleteGunPhoto(gun: Gun, photo: Photo) {
    gun.photos = gun.photos.filter(p => p.id !== photo.id);
    if (gun.primaryPhoto && gun.primaryPhoto.id === photo.id) {
      gun.primaryPhoto = null;
    }
    await this.deleteFile(photo.path);
    await this.gunsCollection.doc(gun.id).update(gun);
  }

  addGunImages(gun: Gun, images: File[]): Observable<number> {
    return new Observable<number>(observer => {
      let promises: Promise<Photo>[] = [];
      let count = 0;
      for (let image of images) {
        promises.push(this.createFile(image, gun.id).then(photo => {
          observer.next(++count);
          return photo;
        }));
      }
      Promise.all(promises).then(photos => {
        this.addGunPhotos(gun, photos).then(() => observer.complete());
      });
    });
  }

  private async createFile(file: File, id: string): Promise<Photo> {
    const path = `/user/${this.user.id}/${id}/${new Date().getTime()}`;
    const { url$ } = this.createFileObservables(file, path);
    const url = await url$.toPromise();
    return { path, url, id: this.getId() };
  }

  private createFileObservables(file: File, path: string): { progress$: Observable<number>, url$: Observable<string> } {
    const fileRef = this.storage.ref(path);
    const task = fileRef.put(file);
    const urlSub = new Subject<string>();
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe((url: string) => {
        urlSub.next(url);
        urlSub.complete();
      });
    })).subscribe();
    const progress$ = task.percentageChanges();
    progress$.subscribe(p => console.log(p));
    return { progress$, url$: urlSub.asObservable() };
  }

  private deleteFile(path: string): Promise<{}> {
    const ref = this.storage.ref(path);
    return ref.delete().toPromise();
  }

  private userStateChanged(user: User) {
    this.user = user;
    if (user.loggedIn) {
      const collectionPath = `/users/${user.id}/guns`;
      this.gunsCollection = this.afs.collection(collectionPath);
      this.gunsCollectionSubscription = this.gunsCollection.valueChanges().subscribe(guns => {
        this._gunsSubject.next(guns);
      });
    } else {
      if (this.gunsCollectionSubscription) {
        this.gunsCollectionSubscription.unsubscribe();
        this.gunsCollectionSubscription = null;
      }
    }
  }
}