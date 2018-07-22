import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockerComponent, NewGunComponent, LoginComponent } from '../components';

const routes: Routes = [
  { path: 'new', component: NewGunComponent },
  { path: '', component: LockerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
