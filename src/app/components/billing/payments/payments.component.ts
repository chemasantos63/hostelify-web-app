import { MatTableDataSource } from '@angular/material/table';
import {
  PaymentMethod,
  PaymentsService,
} from './../../../services/payments.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

export class Payments {
  paymentMethod: PaymentMethod;
  amount: number;
  constructor(paymentMethod: PaymentMethod, amount: number) {
    this.paymentMethod = paymentMethod;
    this.amount = amount;
  }
}
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass'],
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['description', 'amount'];

  dataSource: MatTableDataSource<Payments> = new MatTableDataSource();
  payment!: Payments;
  paymentMethods!: PaymentMethod[];
  selectedPaymentMethod!: PaymentMethod;
  constructor(private paymentService: PaymentsService) {}

  async ngOnInit(): Promise<void> {
    this.paymentMethods = await this.paymentService.fetchPaymentMethods();
  }

  methodChange(event: MatSelectChange) {
    //@ts-ignore
    this.selectedPaymentMethod = this.paymentMethods.find(
      (pm) => pm.id === event.value
    );
  }

  insertRow(amount: number) {
    this.payment = new Payments(this.selectedPaymentMethod,amount);
    //this.dataSource.data.push(this.payment);
    console.log(this.dataSource);
    this.dataSource = new MatTableDataSource([...this.dataSource.data,this.payment]);
  }
}
