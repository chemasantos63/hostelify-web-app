import { LayoutModule } from '@angular/cdk/layout';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeHn from '@angular/common/locales/es-HN';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BalanceComponent } from './components/balance/balance.component';
import { CreateBalanceModalComponent } from './components/balance/create-balance-modal/create-balance-modal.component';
import { BillingComponent } from './components/billing/billing.component';
import { PaymentsComponent } from './components/billing/payments/payments.component';
import { CreateUpdateComponent } from './components/customer/create-update/create-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DashboardCardComponent } from './components/dashboard/dashboard-card/dashboard-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateupdatefiscalinfoComponent } from './components/fiscal-info/createupdatefiscalinfo/createupdatefiscalinfo.component';
import { FiscalInfoComponent } from './components/fiscal-info/fiscal-info.component';
import { LoginComponent } from './components/login/login.component';
import { CreateupdatepermanenceComponent } from './components/permanence/createupdatepermanence/createupdatepermanence.component';
import { PermanenceComponent } from './components/permanence/permanence.component';
import { CreateupdatereservationComponent } from './components/reservation/createupdatereservation/createupdatereservation.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { CreateUpdateRoomComponent } from './components/room/create-update-room/create-update-room.component';
import { RoomComponent } from './components/room/room.component';
import { CreateUpdateRoomerComponent } from './components/roomer/create-update-roomer/create-update-roomer.component';
import { RoomerComponent } from './components/roomer/roomer.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { CreateupdaterolesComponent } from './components/user-roles/createupdateroles/createupdateroles.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { CreateupdateuserComponent } from './components/users/createupdateuser/createupdateuser.component';
import { UsersComponent } from './components/users/users.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AuthService } from './services/auth.service';
import { MaterialModule } from './shared/material/material/material.module';
import { ProductInvoiceComponent } from './components/product-invoice/product-invoice.component';
import { CreateProductInvoiceComponent } from './components/product-invoice/create-product-invoice/create-product-invoice.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
registerLocaleData(localeHn);

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
    UsersComponent,
    CreateupdateuserComponent,
    BalanceComponent,
    CreateBalanceModalComponent,
    FiscalInfoComponent,
    CreateupdatefiscalinfoComponent,
    UserRolesComponent,
    CreateupdaterolesComponent,
    ProductInvoiceComponent,
    CreateProductInvoiceComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    { provide: MatDialogRef, useValue: undefined },
    { provide: MAT_DIALOG_DATA, useValue: undefined },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-mx' },
    { provide: LOCALE_ID, useValue: 'es-HN' },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
