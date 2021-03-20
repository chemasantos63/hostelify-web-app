import { CustomerComponent } from './components/customer/customer.component';
import { RoomComponent } from './components/room/room.component';
import { RoomerComponent } from './components/roomer/roomer.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './components/reservation/reservation.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [AuthGuard],
  },
  { path: 'roomer', component: RoomerComponent, canActivate: [AuthGuard] },
  { path: 'room', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
