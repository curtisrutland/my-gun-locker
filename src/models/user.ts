import * as firebase from 'firebase/app';

export class User {
  constructor(public loaded = false, public afUser?: firebase.User) { }

  get name() {
    return this.afUser ? this.afUser.displayName : "";
  }

  get pictureUrl() {
    return this.afUser ? this.afUser.photoURL : null;
  }

  get id() {
    return this.afUser ? this.afUser.uid : null;
  }

  get loggedIn() {
    return !!this.afUser;
  }

  static create(afUser: firebase.User) {
    return new User(true, afUser);
  }
}