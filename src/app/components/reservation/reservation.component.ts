import { ReservationService } from './../../services/reservation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.sass'],
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.formBuilder.group({
      fromDate: '',
      toDate: '',
      customerId: '',
      roomId: [],
    });
  }

  async handleSubmit() {
    await this.reservationService.reserve(
      this.reservationForm.value.fromDate,
      this.reservationForm.value.toDate,
      this.reservationForm.value.clientId,
      this.reservationForm.value.roomId
    );
  }

  ngOnInit(): void {}
}
