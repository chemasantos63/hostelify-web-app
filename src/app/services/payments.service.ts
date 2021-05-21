import { ApiPath } from './../shared/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface PaymentMethod {
  id: number;
  description: string;
  symbol: string;
  exchangeRate: number;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private httpClient: HttpClient) {}

  async fetchPaymentMethods(): Promise<PaymentMethod[]> {
    return this.httpClient
      .get<PaymentMethod[]>(`${environment.BASE_URI}/${ApiPath.PaymentMethods}`)
      .toPromise();
  }
}
