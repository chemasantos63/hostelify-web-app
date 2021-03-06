import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RoomerComponent } from './components/roomer/roomer.component';
import { RoomComponent } from './components/room/room.component';
import { CreateUpdateComponent } from './components/customer/create-update/create-update.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUpdateRoomComponent } from './components/room/create-update-room/create-update-room.component';
import { CreateUpdateRoomerComponent } from './components/roomer/create-update-roomer/create-update-roomer.component';
import { CreateupdatereservationComponent } from './components/reservation/createupdatereservation/createupdatereservation.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardCardComponent } from './components/dashboard/dashboard-card/dashboard-card.component';
import { PermanenceComponent } from './components/permanence/permanence.component';
import { CreateupdatepermanenceComponent } from './components/permanence/createupdatepermanence/createupdatepermanence.component';
import { BillingComponent } from './components/billing/billing.component';
import { PaymentsComponent } from './components/billing/payments/payments.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavbarComponent,
    ReservationComponent,
    CustomerComponent,
    RoomerComponent,
    RoomComponent,
    CreateUpdateComponent,
    CreateUpdateRoomComponent,
    CreateUpdateRoomerComponent,
    CreateupdatereservationComponent,
    DashboardComponent,
    DashboardCardComponent,
    PermanenceComponent,
    CreateupdatepermanenceComponent,
    BillingComponent,
    PaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    { provide: MatDialogRef, useValue: undefined },
    { provide: MAT_DIALOG_DATA, useValue: undefined },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
