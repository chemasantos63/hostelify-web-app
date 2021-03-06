import { Reservation } from './../components/reservation/reservation.component';
import { Permanence } from './../components/permanence/permanence.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../components/customer/customer.component';
import { Room } from '../components/room/room.component';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../shared/endpoints';
import { map } from 'rxjs/operators';

export interface PermanenceDto {
  idReservation: number;
  guestIds: number[];
  // checkIn: Date;
  // checkOut: Date;
  // customer: Customer;
  // roomersQty: number;
  // rooms: Room[];
  // idCheckInUser: number;
  // idCheckOutUser: number;
}

@Injectable({
  providedIn: 'root',
})
export class PermanenceService {
  constructor(private readonly http: HttpClient) {}

  async fetchPermanenceById(id: number): Promise<Permanence> {
    return this.http
      .get<Permanence>(`${environment.BASE_URI}/${ApiPath.GetAllPermanences}`)
      .toPromise();
  }

  async fetchAllPermanence(): Promise<Permanence[]> {
    return this.http
      .get<Permanence[]>(`${environment.BASE_URI}/${ApiPath.GetAllPermanences}`)
      .toPromise();
  }

  async checkIn(permanenceDto: PermanenceDto): Promise<any> {
    return this.http
      .post<PermanenceDto>(
        `${environment.BASE_URI}/${ApiPath.GetAllPermanences}`,
        permanenceDto
      )
      .toPromise();
  }

  async updatePermanenceById(
    id: number,
    permanenceDto: PermanenceDto
  ): Promise<boolean> {
    return this.http
      .patch<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllPermanences}/${id}`,
        permanenceDto
      )
      .toPromise();
  }

  async deletePermanenceById(id: number): Promise<boolean> {
    return this.http
      .delete<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllPermanences}/${id}`
      )
      .toPromise();
  }

  async getTotalToPayByPermaneceId(permanencesId: number[]): Promise<number> {
    return this.http
      .post<number>(
        `${environment.BASE_URI}/${ApiPath.GetAllPermanences}/${ApiPath.PermanenceTotalToPay}`,
        { permanencesId }
      )
      .pipe(map((response: any) => response.total))
      .toPromise();
  }
}
