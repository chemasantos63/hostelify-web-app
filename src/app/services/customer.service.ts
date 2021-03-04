import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor() {}

  async createCustomer(
    names: string,
    lastNames: string,
    documentNumber: number,
    phone: number,
    email: string,
    type: number
  ): Promise<any>{
    const body = {
      names,
      lastNames,
      documentNumber,
      phone,
      email,
      type
    }
  }
}
