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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createupdatepermanence',
  templateUrl: './createupdatepermanence.component.html',
  styleUrls: ['./createupdatepermanence.component.sass'],
})
export class CreateupdatepermanenceComponent implements OnInit {
  createUpdatePermanenceForm: FormGroup;
  createReservationForm: FormGroup;
  creatingPermanence = true;
  rooms: Room[] = [];
  customer: Customer[] = [];
  roomerIds: number[] = [];
  today = new Date();
  customers: Customer[] = [];
  // @ts-ignore
  reservation: Reservation = {};

  constructor(
    private formBuilder: FormBuilder,
    private permanenceService: PermanenceService,
    private roomService: RoomService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      permanence?: Permanence;
      createPermanenceWithOutReservation: boolean;
    },
    private dialogRef: MatDialogRef<CreateupdatepermanenceComponent>,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {

    this.createUpdatePermanenceForm = this.formBuilder.group({
      idReservation: data ? data.permanence?.reservation : '',
      customer: data ? data.permanence?.customer : '',
      checkIn: data ? data.permanence?.checkIn : '',
      checkOut: data ? data.permanence?.checkOut : '',
      idCheckInUser: data ? data.permanence?.idCheckInUser : '',
      idCheckOutUser: data ? data.permanence?.idCheckOutUser : '',
      rooms: new FormControl(
        data ? data.permanence?.rooms.map((r) => r.id) : ''
      ),
    });

    this.createReservationForm = this.formBuilder.group({
      fromDate: '',
      toDate: '',
      customerId: '',
      roomersQty: '',
      roomIds: [],
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
          this.data.permanence?.id || 0,
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

  async loadAvailableRooms(): Promise<void> {
    this.rooms = await this.roomService.fetchAvailableRooms(
      this.datePipe.transform(
        this.createReservationForm.value.toDate,
        'yyyy-MM-dd'
      )!,
      this.datePipe.transform(
        this.createReservationForm.value.fromDate,
        'yyyy-MM-dd'
      )!
    );
  }

  async loadCustomers(): Promise<void> {
    this.customers = await this.customerService.fetchAllCustomers();
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
    if (this.data?.createPermanenceWithOutReservation) {
      const reservation = await this.reservationService.reserve({
        fromDate: this.createReservationForm.value.fromDate,
        toDate: this.createReservationForm.value.toDate,
        customerId: this.createReservationForm.value.customerId,
        roomersQty: this.createReservationForm.value.roomersQty,
        roomIds: this.createReservationForm.value.roomIds,
      });

      const response = await this.permanenceService.checkIn({
        idReservation: reservation.id,
        guestIds: this.roomerIds,
      });

      if (response) {
        this.toastr.success(
          `Se registro la permanencia exitosamente.`,
          `Operacion Exitosa`
        );
      }
    } else {
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
