import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor() {}

  async reserve(
    fromDate: string,
    toDate: string,
    clientId: number,
    roomId: number[]
  ): Promise<any> {
    const body = {
      fromDate,
      toDate,
      clientId,
      roomId,
    };
  }
}
