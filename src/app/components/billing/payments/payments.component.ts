import { PermanenceService } from './../../../services/permanence.service';
import { Permanence } from './../../permanence/permanence.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  PaymentMethod,
  PaymentsService,
} from './../../../services/payments.service';
import { Component, OnInit } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  private readonly ID_LPS_CASH = 1;
  displayedColumns: string[] = ['description', 'amount'];

  dataSource: MatTableDataSource<Payments> = new MatTableDataSource();
  payment!: Payments;
  paymentMethods!: PaymentMethod[];
  selectedPaymentMethod!: PaymentMethod;
  totalToPay: number;

  constructor(
    private paymentService: PaymentsService,
    @Inject(MAT_DIALOG_DATA) public data: { permanence: Permanence },
    private dialoRef: MatDialogRef<PaymentsComponent>,
    private permanenceService: PermanenceService,
    private toastrService: ToastrService
  ) {
    this.totalToPay = 0;
  }

  async ngOnInit(): Promise<void> {
    this.paymentMethods = await this.paymentService.fetchPaymentMethods();
    this.totalToPay = await this.permanenceService.getTotalToPayByPermaneceId([
      this.data.permanence.id,
    ]);
  }

  methodChange(event: MatSelectChange) {
    //@ts-ignore
    this.selectedPaymentMethod = this.paymentMethods.find(
      (pm) => pm.id === event.value
    );
  }

  insertRow(amount: number) {
    this.payment = new Payments(this.selectedPaymentMethod, amount);

    this.dataSource = new MatTableDataSource([
      ...this.dataSource.data,
      this.payment,
    ]);

    const totalInPayments = this.dataSource.data.reduce(
      (acc, act) => acc + +act.amount,
      0
    );

    if (this.totalToPay < totalInPayments) {
      this.createCashBackPayment(totalInPayments);
    }
  }

  handlePayClick(condition: string): void {
    const totalInPayments = this.dataSource.data.reduce(
      (acc, act) => acc + +act.amount,
      0
    );
    if (this.totalToPay > totalInPayments) {
      this.toastrService.warning(
        `La cantidad de pagos no coinciden con el total a pagar.`,
        `Atencion`
      );
      return;
    }

    this.dialoRef.close({ data: this.dataSource.data, condition });
  }

  private createCashBackPayment(totalInPayments: number) {
    const paymentMethodCash = this.paymentMethods.find(
      (p) => p.id === this.ID_LPS_CASH
    )!;
    if (paymentMethodCash) {
      const paymentCashBack = new Payments(
        paymentMethodCash,
        this.totalToPay - totalInPayments
      );
      this.dataSource.data = [...this.dataSource.data, paymentCashBack];
    }
  }
}
