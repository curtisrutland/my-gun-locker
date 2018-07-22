import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { UserService } from './user.service';
import { Gun, User } from '../models';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable()
export class LockerService {

  constructor(public userService: UserService, public afs: AngularFirestore) {
    userService.user$.subscribe(user => this.userStateChanged(user));
  }

  private gunsCollection: AngularFirestoreCollection<Gun>;
  private gunsCollectionSubscription: Subscription;
  private _gunsSubject = new Subject<Gun[]>();
  guns$ = this._gunsSubject.asObservable();

  createTestGun() {
    const newId = this.afs.createId();
    const gun: Gun = {
      id: newId,
      name: "test",
      details: "test details",
      notes: "test notes",
      serial: "ABCD123"
    };
    if(this.gunsCollection) {
      this.gunsCollection.doc(newId).set(gun);
    }
  }

  async createGun(gun: Gun) {
    await this.gunsCollection.doc(gun.id).set(gun);
  }

  getId(): string {
    return this.afs.createId(); 
  }

  private userStateChanged(user: User) {
    if(user.loggedIn) {
      const collectionPath = `/users/${user.id}/guns`;
      this.gunsCollection = this.afs.collection(collectionPath);
      this.gunsCollectionSubscription = this.gunsCollection.valueChanges().subscribe(guns => {
        this._gunsSubject.next(guns);
      });
    } else {
      if(this.gunsCollectionSubscription){
        this.gunsCollectionSubscription.unsubscribe();
        this.gunsCollectionSubscription = null;
      }
    }
  }
}