import { UsersComponent } from './components/users/users.component';
import { PermanenceComponent } from './components/permanence/permanence.component';
import { CreateupdatepermanenceComponent } from './components/permanence/createupdatepermanence/createupdatepermanence.component';
import { BillingComponent } from './components/billing/billing.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RoomComponent } from './components/room/room.component';
import { RoomerComponent } from './components/roomer/roomer.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './components/reservation/reservation.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [AuthGuard],
  },
  { path: 'roomer', component: RoomerComponent, canActivate: [AuthGuard] },
  { path: 'room', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  {
    path: 'permanence',
    children: [
      { path: '', component: PermanenceComponent },
      { path: ':reservationId', component: CreateupdatepermanenceComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'billing', component: BillingComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
