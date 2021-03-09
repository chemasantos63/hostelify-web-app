import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiPath } from '../shared/endpoints';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private readonly http: HttpClient) {}

  async fetchAllCustomers(
    // names: string,
    // lastNames: string,
    // documentNumber: number,
    // phone: number,
    // email: string,
    // type: number
  ): Promise<any> {
    // const body = {
    //   names,
    //   lastNames,
    //   documentNumber,
    //   phone,
    //   email,
    //   type,
    // };

    const token = localStorage.getItem(`currentToken`);

    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http.get(`${environment.BASE_URI}/${ApiPath.GetAllCustomers}`, {
      headers,
    }).toPromise();
  }
}
