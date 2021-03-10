import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from './../components/room/room.component';
import { Customer } from './../components/customer/customer.component';
import { Injectable } from '@angular/core';
import { Reservation } from '../components/reservation/reservation.component';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../shared/endpoints';

export interface ReservationDto {
  fromDate: Date;
  toDate: Date;
  clienteId: Customer;
  roomId: Room[];
}
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private readonly http: HttpClient) {}

  async fetchAllReservations(): Promise<Reservation[]> {
    const token = localStorage.getItem('currentToken');
    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .get<Reservation[]>(
        `${environment.BASE_URI}/${ApiPath.GetAllReservations}`,
        {
          headers,
        }
      )
      .toPromise();
  }

  async reserve(reservationDto: ReservationDto): Promise<any> {
    const token = localStorage.getItem('currentToken');
    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .post<Reservation>(
        `${environment.BASE_URI}/${ApiPath.GetAllReservations}`,
        reservationDto,{ headers }).toPromise();
  }
}
