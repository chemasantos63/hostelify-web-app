import { RoomService } from './../../../services/room.service';
import { CustomerService } from './../../../services/customer.service';
import { Customer } from './../../customer/customer.component';
import { Reservation } from './../reservation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { ReservationService } from './../../../services/reservation.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, Inject, OnInit, QueryList } from '@angular/core';
import { Room } from '../../room/room.component';
import { DatePipe } from '@angular/common';
import { regexJustForNumbersWithoutDecimal } from '../../../shared/utils';

@Component({
  selector: 'app-createupdatereservation',
  templateUrl: './createupdatereservation.component.html',
  styleUrls: ['./createupdatereservation.component.sass'],
})
export class CreateupdatereservationComponent implements OnInit {
  createUpdateReservationForm: FormGroup;
  creatingReservation = true;
  rooms: Room[] = [];
  customers: Customer[] = [];
  today = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation },
    private dialogRef: MatDialogRef<CreateupdatereservationComponent>,
    private datePipe: DatePipe
  ) {
    this.createUpdateReservationForm = this.formBuilder.group({
      fromDate: data ? data.reservation.fromDate : '',
      toDate: data ? data.reservation.toDate : '',
      customerId: data ? data.reservation.customer.id : '',
      roomersQty: new FormControl(data ? data.reservation.roomersQty : '', [
        Validators.required,
        Validators.pattern(regexJustForNumbersWithoutDecimal),
      ]),
      roomIds: new FormControl(
        data ? data.reservation.rooms.map((r) => r.id) : ''
      ),
    });

    if (data) {
      this.creatingReservation = false;
    }
  }

  async handleSubmit() {
    try {
      if (this.createUpdateReservationForm.valid) {
        if (this.creatingReservation) {
          await this.reservationService.reserve(
            this.createUpdateReservationForm.value
          );
        } else {
          await this.reservationService.updateReservationById(
            this.data.reservation.id,
            this.createUpdateReservationForm.value
          );
        }

        this.closeDialog(true);
      }
    } catch (e) {
      this.closeDialog(false);
    }
  }

  async loadAvailableRooms(): Promise<void> {
    this.rooms = await this.roomService.fetchAvailableRooms(
      this.datePipe.transform(
        this.createUpdateReservationForm.value.toDate,
        'yyyy-MM-dd'
      )!,
      this.datePipe.transform(
        this.createUpdateReservationForm.value.fromDate,
        'yyyy-MM-dd'
      )!
    );
    console.log('prueba');
  }

  async loadCustomers(): Promise<void> {
    this.customers = await this.customerService.fetchAllCustomers();
  }

  async ngOnInit(): Promise<void> {
    await this.loadCustomers();
  }

  closeDialog(success?: boolean): void {
    this.dialogRef.close(success);
  }
}
