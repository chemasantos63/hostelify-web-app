import { CustomerComponent } from './components/customer/customer.component';
import { RoomComponent } from './components/room/room.component';
import { RoomerComponent } from './components/roomer/roomer.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './components/reservation/reservation.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reservation', component: ReservationComponent },
  {path: 'roomer', component: RoomerComponent},
  {path:'room',component: RoomComponent},
  {path:'customer',component: CustomerComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
