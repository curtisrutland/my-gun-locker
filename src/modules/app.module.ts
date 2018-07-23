import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRouterModule } from './app-router.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  AppComponent, LoginComponent, NavbarComponent,
  LockerComponent, GunCardComponent, GunCardColsComponent,
  GunCardColsContainerComponent, AddGunComponent, GunComponent,
  ScrollTopComponent, NewGunComponent, HeroComponent,
  NotificationComponent, PhotoGridComponent
} from '../components';
import { UserService, LockerService } from "../services";

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, NavbarComponent,
    LockerComponent, GunCardComponent, GunCardColsComponent,
    GunCardColsContainerComponent, ScrollTopComponent, NewGunComponent,
    AddGunComponent, GunComponent, HeroComponent, PhotoGridComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    AppRouterModule
  ],
  providers: [
    UserService,
    LockerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
