import { ApiPath } from './../shared/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice, Payment } from '../components/billing/billing.component';
import { User } from './auth.service';
import { map } from 'rxjs/operators';

export interface Balance {
  id: number;
  initialBalance: string;
  cashTotal: string;
  cardTotal: string;
  closingDate: Date;
  createdAt: Date;
  updatedAt: Date;
  invoices: Invoice[];
  payments: Payment[];
  user: User;
}

export interface CreateBalanceDTO {
  initialBalance: number;
}

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private readonly http: HttpClient) {}

  fetchBalancesByUser(): Promise<Balance[]> {
    return this.http
      .get<Balance[]>(`${environment.BASE_URI}/${ApiPath.balanceByUser}`)
      .pipe(
        map((response) =>
          response.map((b) => {
            b.createdAt = new Date(b.createdAt);
            b.updatedAt = new Date(b.updatedAt);
            b.closingDate = new Date(b.closingDate);
            return b;
          })
        )
      )
      .toPromise();
  }

  createBalance(body: CreateBalanceDTO): Promise<Balance> {
    return this.http
      .post<Balance>(`${environment.BASE_URI}/${ApiPath.balance}`, { body })
      .toPromise();
  }
}
