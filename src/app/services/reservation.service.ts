import { Reservation } from './../components/reservation/reservation.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from './../components/room/room.component';
import { Customer } from './../components/customer/customer.component';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../shared/endpoints';

export interface ReservationDto {
  fromDate: Date;
  toDate: Date;
  customerId: Customer;
  roomersQty: number;
  roomIds: Room[];
}
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private readonly http: HttpClient) {}

  async fetchReservationById(id: number): Promise<Reservation> {
    return this.http
      .get<Reservation>(`${environment.BASE_URI}/${ApiPath.GetAllReservations}`)
      .toPromise();
  }

  async fetchAllReservations(): Promise<Reservation[]> {
    return this.http
      .get<Reservation[]>(
        `${environment.BASE_URI}/${ApiPath.GetAllReservations}`
      )
      .toPromise();
  }

  async reserve(reservationDto: ReservationDto): Promise<any> {
    return this.http
      .post<ReservationDto>(
        `${environment.BASE_URI}/${ApiPath.GetAllReservations}`,
        reservationDto
      )
      .toPromise();
  }

  async updateReservationById(
    id: number,
    reservationDto: ReservationDto
  ): Promise<boolean> {
    return this.http
      .patch<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllReservations}/${id}`,
        reservationDto
      )
      .toPromise();
  }

  async deleteReservationById(id: number): Promise<boolean> {
    return this.http
      .delete<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllReservations}/${id}`
      )
      .toPromise();
  }
}
