import { ReservationService } from './../../../services/reservation.service';
import { Permanence } from './../permanence.component';
import { CustomerService } from './../../../services/customer.service';
import { RoomService } from './../../../services/room.service';
import { PermanenceService } from './../../../services/permanence.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Room } from '../../room/room.component';
import { Customer } from '../../customer/customer.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../reservation/reservation.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createupdatepermanence',
  templateUrl: './createupdatepermanence.component.html',
  styleUrls: ['./createupdatepermanence.component.sass'],
})
export class CreateupdatepermanenceComponent implements OnInit {
  createUpdatePermanenceForm: FormGroup;
  creatingPermanence = true;
  rooms: Room[] = [];
  customer: Customer[] = [];
  roomerIds: number[] = [];
  today = new Date();
  // @ts-ignore
  reservation: Reservation = {};

  constructor(
    private formBuilder: FormBuilder,
    private permanenceService: PermanenceService,
    private roomService: RoomService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: { permanence: Permanence },
    private dialogRef: MatDialogRef<CreateupdatepermanenceComponent>,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private toastr: ToastrService
  ) {
    this.createUpdatePermanenceForm = this.formBuilder.group({
      idReservation: data ? data.permanence.reservation : '',
      customer: data ? data.permanence.customer : '',
      checkIn: data ? data.permanence.checkIn : '',
      checkOut: data ? data.permanence.checkOut : '',
      idCheckInUser: data ? data.permanence.idCheckInUser : '',
      idCheckOutUser: data ? data.permanence.idCheckOutUser : '',
      rooms: new FormControl(
        data ? data.permanence.rooms.map((r) => r.id) : ''
      ),
    });
    if (data) {
      this.creatingPermanence = false;
    }
  }

  async handleSubmit() {
    try {
      if (this.creatingPermanence) {
        await this.permanenceService.checkIn(
          this.createUpdatePermanenceForm.value
        );
      } else {
        await this.permanenceService.updatePermanenceById(
          this.data.permanence.id,
          this.createUpdatePermanenceForm.value
        );
      }

      this.closeDialog(true);
    } catch (e) {
      this.closeDialog(false);
    }
  }

  async loadRooms(): Promise<void> {
    this.rooms = await this.roomService.fetchAllRooms();
  }

  async loadCustomers(): Promise<void> {
    this.customer = await this.customerService.fetchAllCustomers();
  }

  closeDialog(success?: boolean): void {
    this.dialogRef.close(success);
  }

  ngOnInit(): void {
    this.reservation = JSON.parse(
      localStorage.getItem('reservationToCreatePermananence')!
    ) as Reservation;

    this.loadRooms();

    this.loadCustomers();
  }

  async handleCreatePermanenceClick(): Promise<void> {
    const response = await this.permanenceService.checkIn({
      idReservation: this.reservation.id,
      guestIds: this.roomerIds,
    });

    if (response) {
      this.toastr.success(
        `Se registro la permanencia exitosamente.`,
        `Operacion Exitosa`
      );
    }
  }

  handleSelectRoomer(roomerIds: number[]): void {
    if (roomerIds.length > this.reservation.roomersQty) {
      this.toastr.warning(
        `La reservacion indica que solo 2 huespedes, se actualizara la cantidad de huespedes.`,
        `Atencion`
      );

      this.reservation.roomersQty = roomerIds.length;
    }

    this.roomerIds = roomerIds;
  }
}
