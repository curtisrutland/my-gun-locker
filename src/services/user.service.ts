import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from "../models";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  constructor(public afAuth: AngularFireAuth) {
    afAuth.auth.onAuthStateChanged(afUser => this.userStateChanged(afUser));
  }

  private _user$ = new BehaviorSubject<User>(new User());
  user$ = this._user$.asObservable();

  private userStateChanged(afUser: firebase.User) {
    this._user$.next(User.create(afUser));
  }

  logIn() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

}