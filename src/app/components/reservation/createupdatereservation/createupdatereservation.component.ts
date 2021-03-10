import { Reservation } from './../reservation.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { ReservationService } from './../../../services/reservation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit, QueryList } from '@angular/core';

@Component({
  selector: 'app-createupdatereservation',
  templateUrl: './createupdatereservation.component.html',
  styleUrls: ['./createupdatereservation.component.sass'],
})
export class CreateupdatereservationComponent implements OnInit {
  createUpdateReservationForm: FormGroup;
  creatingReservation = true;
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation },
  ) {
   this.createUpdateReservationForm = this.formBuilder.group({
    fromDate: data ? data.reservation.fromDate : '',
    toDate: data ? data.reservation.toDate : '',
    clientId: data ? data.reservation.clienteId : '',
    roomId: data ? data.reservation.roomId : '',    
   });
  
   if (data){
    this.creatingReservation = false;
  }

  }

 
  async handleSubmit() {
    if (this.createUpdateReservationForm){
      await this.reservationService.reserve(this.createUpdateReservationForm.value);
    }else {

    }
    
  }

  ngOnInit(): void {}
}
