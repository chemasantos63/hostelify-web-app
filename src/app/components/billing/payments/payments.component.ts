import { PaymentMethod, PaymentsService } from './../../../services/payments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass'],
})
export class PaymentsComponent implements OnInit {
  paymentMethods!: PaymentMethod[];
  constructor(private paymentService: PaymentsService) {}



 async ngOnInit(): Promise<void> {
   this.paymentMethods=await this.paymentService.fetchPaymentMethods();
 }
}
