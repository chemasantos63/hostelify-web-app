import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InVoice } from '../components/billing/billing.component';
import { Customer } from '../components/customer/customer.component';
import { ApiPath } from '../shared/endpoints';

export interface InVoiceDto {
  inVoiceNumber: number;
  createdDate: Date;
  expirationDate: Date;
  customer: Customer;
  emitionPointID: number;
  caiId: number;
  income: number;
  tax15: number;
  tax18: number;
  tourismTax: number;
  discount: number;
  discountPercent: number;
  condition: string;
  paymentTermId: number;
  paymentTypeId: number;
}
@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private readonly http: HttpClient) {}

  async fechtBillById(id: number): Promise<InVoice> {
    return this.http
      .get<InVoice>(`${environment.BASE_URI}/${ApiPath.GetAllBills}/${id}`)
      .toPromise();
  }

  async fetchAllBills(): Promise<InVoice[]> {
    return this.http
      .get<InVoice[]>(`${environment.BASE_URI}/${ApiPath.GetAllBills}`)
      .toPromise();
  }

  async createBill(inVoiceDto: InVoiceDto): Promise<InVoice> {
    return this.http
      .post<InVoice>(
        `${environment.BASE_URI}/${ApiPath.GetAllBills}`,
        inVoiceDto
      )
      .toPromise();
  }

  async updateBillById(id: number, inVoiceDto: InVoiceDto): Promise<boolean> {
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
}
