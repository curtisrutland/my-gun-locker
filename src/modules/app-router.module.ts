import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockerComponent, NewGunComponent, LoginComponent, GunComponent } from '../components';

const routes: Routes = [
  { path: 'new', component: NewGunComponent },
  { path: 'locker', component: LockerComponent },
  { path: 'g/:id', component: GunComponent },
  { path: '', redirectTo: '/locker', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
