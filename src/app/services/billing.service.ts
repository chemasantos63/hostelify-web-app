import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice } from '../components/billing/billing.component';
import { Payments } from '../components/billing/payments/payments.component';
import { Customer } from '../components/customer/customer.component';
import { ApiPath } from '../shared/endpoints';

export class CreateInvoiceDTO {
  permanencesId: number[];
  payments: PaymentMethodWithAmount[];
  condition: string;
  constructor(
    permanencesId: number[],
    payments: Payments[],
    condition: string
  ) {
    this.permanencesId = permanencesId;
    this.payments = payments.map((p) => {
      return {
        paymentMethodId: p.paymentMethod.id.toFixed(),
        amount: p.amount,
      };
    });
    this.condition = condition;
  }
}

export class PaymentMethodWithAmount {
  paymentMethodId: string;
  amount: number;
  constructor(paymentMethodId: string, amount: number) {
    this.paymentMethodId = paymentMethodId;
    this.amount = amount;
  }
}
@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private readonly http: HttpClient) {}

  async fechtBillById(id: number): Promise<Invoice> {
    return this.http
      .get<Invoice>(`${environment.BASE_URI}/${ApiPath.GetAllBills}/${id}`)
      .toPromise();
  }

  async fetchAllBills(): Promise<Invoice[]> {
    return this.http
      .get<Invoice[]>(`${environment.BASE_URI}/${ApiPath.GetAllBills}`)
      .toPromise();
  }

  async createBill(createInvoiceDTO: CreateInvoiceDTO): Promise<Invoice> {
    return this.http
      .post<Invoice>(
        `${environment.BASE_URI}/${ApiPath.GetAllBills}`,
        createInvoiceDTO
      )
      .toPromise();
  }

  async updateBillById(
    id: number,
    inVoiceDto: CreateInvoiceDTO
  ): Promise<boolean> {
    return this.http
      .patch<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllBills}/${id}`,
        inVoiceDto
      )
      .toPromise();
  }

  async deleteBillById(id: number): Promise<boolean> {
    return this.http
      .delete<boolean>(`${environment.BASE_URI}/${ApiPath.GetAllBills}/${id}`)
      .toPromise();
  }

  getInvoicePdf(invoice: Invoice): string {
    // return await this.http
    //   .get<void>(`${environment.BASE_URI}/billing/invoicePdf/${invoice.id}`)
    //   .toPromise();

    return `${environment.BASE_URI}/billing/invoicePdf/${invoice.id}`;
  }
}
