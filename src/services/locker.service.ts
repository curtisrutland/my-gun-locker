import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { AngularFireStorage } from 'angularfire2/storage';
import { UserService } from './user.service';
import { Gun, User } from '../models';
import { Subscription, BehaviorSubject } from 'rxjs';
import { finalize, map, switchMap } from "rxjs/operators";

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

  async createGun(gun: Gun, primaryImage?: File) {
    if (!gun.id) gun.id = this.getId();
    const { id } = gun;
    if (primaryImage) {
      let primaryImageUrl = await this.createFile(primaryImage, id);
      gun.primaryPhotoUrl = primaryImageUrl;
    }
    await this.gunsCollection.doc(id).set(gun);
  }

  private async createFile(file: File, id: string): Promise<string> {
    const filePath = `/user/${this.user.id}/${id}/${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.put(file);
    return new Promise<string>((res, rej) => {
      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(url => res(url)))
      ).subscribe();
    });
  }

  getId(): string {
    return this.afs.createId();
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