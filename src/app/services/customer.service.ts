import { Customer } from './../components/customer/customer.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiPath } from '../shared/endpoints';

export interface CustomerDto {
  name: string;
  lastname: string;
  documentNumber: string;
  customerTypeId: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private readonly http: HttpClient) {}

  async fetchAllCustomers(): Promise<Customer[]> {
    const token = localStorage.getItem(`currentToken`);

    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .get<Customer[]>(`${environment.BASE_URI}/${ApiPath.GetAllCustomers}`, {
        headers,
      })
      .toPromise();
  }

  async createCustomer(customerDto: CustomerDto): Promise<Customer> {
    const token = localStorage.getItem(`currentToken`);

    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .post<Customer>(
        `${environment.BASE_URI}/${ApiPath.GetAllCustomers}`,
        customerDto,
        { headers }
      )
      .toPromise();
  }
}
