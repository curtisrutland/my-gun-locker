import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  HeroComponent, GunCardColsContainerComponent, AddGunComponent,
  ScrollTopComponent
} from '../components';
import { ContainerDirective, ButtonDirective } from "../directives";
import { UserService, LockerService } from "../services";

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    LockerComponent,
    GunCardComponent,
    GunCardColsComponent,
    GunCardColsContainerComponent,
    ScrollTopComponent,
    AddGunComponent,
    HeroComponent,
    ContainerDirective,
    ButtonDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
