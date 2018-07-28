import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockerComponent, NewGunComponent, GunPhotosComponent, GunComponent } from '../components';

const routes: Routes = [
  { path: 'new', component: NewGunComponent },
  { path: 'g/:id', component: GunComponent },
  { path: 'p/:id', component: GunPhotosComponent },
  { path: '', component: LockerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRouterModule { }
