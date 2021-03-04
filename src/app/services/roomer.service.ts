import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomerService {
  constructor() {}
  async createRoomer(
    names: string,
    lastNames: string,
    documentNumber: string,
    nacionality: string,
    provenance: string,
    destination: string,
    occupation: string,
    phone: number
  ):Promise<any> {
    const body ={
      names,
      lastNames,
      documentNumber,
      nacionality,
      provenance,
      destination,
      occupation,
      phone
    }
  }
}
