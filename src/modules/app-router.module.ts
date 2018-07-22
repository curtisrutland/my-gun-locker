import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockerComponent } from '../components';

const routes: Routes = [
  { path: 'locker', component: LockerComponent },
  { path: '', redirectTo: '/locker', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
