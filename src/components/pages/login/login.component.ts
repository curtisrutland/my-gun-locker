import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

const paddClassName = "has-navbar-fixed-top";

@Component({
  selector: 'mgl-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
    //document.querySelector("html").classList.remove(paddClassName);
  }

  ngOnDestroy() {
    //document.querySelector("html").classList.add(paddClassName);
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}