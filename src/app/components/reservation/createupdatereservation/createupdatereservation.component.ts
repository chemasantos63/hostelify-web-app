import { RoomService } from './../../../services/room.service';
import { CustomerService } from './../../../services/customer.service';
import { Customer } from './../../customer/customer.component';
import { Reservation } from './../reservation.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { ReservationService } from './../../../services/reservation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation }
  ) {
    this.createUpdateReservationForm = this.formBuilder.group({
      fromDate: data ? data.reservation.fromDate : '',
      toDate: data ? data.reservation.toDate : '',
      clientId: data ? data.reservation.clienteId : '',
      roomId: data ? data.reservation.roomId : '',
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
  }

  async loadRooms(): Promise<void>{
    this.rooms = await this.roomService.fetchAllRooms();
  }

  async loadCustomers(): Promise<void>{
    this.customers = await this.customerService.fetchAllCustomers();
  }

  ngOnInit(): void {
    this.loadRooms();
    this.loadCustomers();
  }
}
