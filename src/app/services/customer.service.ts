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

  async fetchCustomerById(id: number): Promise<Customer> {
    return this.http
      .get<Customer>(
        `${environment.BASE_URI}/${ApiPath.GetAllCustomers}/${id}`)
      .toPromise();
  }

  async fetchAllCustomers(): Promise<Customer[]> {
    return this.http
      .get<Customer[]>(`${environment.BASE_URI}/${ApiPath.GetAllCustomers}`)
      .toPromise();
  }

  async createCustomer(customerDto: CustomerDto): Promise<Customer> {
    return this.http
      .post<Customer>(
        `${environment.BASE_URI}/${ApiPath.GetAllCustomers}`,
        customerDto)
      .toPromise();
  }

  async updateCustomerById(
    id: number,
    customerDto: CustomerDto
  ): Promise<boolean> {
    return this.http
      .patch<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllCustomers}/${id}`,
        customerDto
      )
      .toPromise();
  }

  async deleteCustomerById(id: number): Promise<boolean> {
    return this.http
      .delete<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllCustomers}/${id}`
      )
      .toPromise();
  }
}
