import { RoomService } from './../../../services/room.service';
import { CustomerService } from './../../../services/customer.service';
import { Customer } from './../../customer/customer.component';
import { Reservation } from './../reservation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { ReservationService } from './../../../services/reservation.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit, QueryList } from '@angular/core';
import { Room } from '../../room/room.component';

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
    private dialogRef : MatDialogRef<CreateupdatereservationComponent>
  ) {
    
    this.createUpdateReservationForm = this.formBuilder.group({
      fromDate: data ? data.reservation.fromDate : '',
      toDate: data ? data.reservation.toDate : '',
      customerId: data ? data.reservation.customer.id : '',
      roomIds: new FormControl(data ? data.reservation.rooms.map((r) => r.id) : ''),
    });

    if (data) {
      this.creatingReservation = false;
    }
  }

  async handleSubmit() {
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
    this.closeDialog();
  }

  async loadRooms(): Promise<void> {
    this.rooms = await this.roomService.fetchAllRooms();
  }

  async loadCustomers(): Promise<void> {
    this.customers = await this.customerService.fetchAllCustomers();
  }

  ngOnInit(): void {
    this.loadRooms();
    this.loadCustomers();
  }

  closeDialog(){
    this.dialogRef.close('prueba');
  }
}
