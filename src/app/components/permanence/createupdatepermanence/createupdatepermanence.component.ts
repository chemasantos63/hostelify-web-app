import { Permanence } from './../permanence.component';
import { CustomerService } from './../../../services/customer.service';
import { RoomService } from './../../../services/room.service';
import { PermanenceService } from './../../../services/permanence.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Room } from '../../room/room.component';
import { Customer } from '../../customer/customer.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-createupdatepermanence',
  templateUrl: './createupdatepermanence.component.html',
  styleUrls: ['./createupdatepermanence.component.sass'],
})
export class CreateupdatepermanenceComponent implements OnInit {
  createUpdatePermaneceForm: FormGroup;
  creatingPermanence = true;
  rooms: Room[] = [];
  customer: Customer[] = [];
  today = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private permanenceService: PermanenceService,
    private roomService: RoomService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: { permanence: Permanence },
    private dialogRef: MatDialogRef<CreateupdatepermanenceComponent>
  ) {
    this.createUpdatePermaneceForm = this.formBuilder.group({
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

  async hadleSubmit() {
    try {
      if (this.creatingPermanence) {
        await this.permanenceService.checkIn(
          this.createUpdatePermaneceForm.value
        );
      } else {
        await this.permanenceService.updatePermanenceById(
          this.data.permanence.id,
          this.createUpdatePermaneceForm.value
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
    this.loadRooms();
    this.loadCustomers();
  }
}
