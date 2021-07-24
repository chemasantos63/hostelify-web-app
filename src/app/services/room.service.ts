import { RoomStatus, RoomType } from './../components/room/room.component';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../components/room/room.component';
import { ApiPath } from '../shared/endpoints';
import { DatePipe } from '@angular/common';

export interface RoomDto {
  rNumber: Number;
  type: Number;
  location: string;
}
@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private readonly http: HttpClient, private datePipe: DatePipe) {}

  async fetchRoomById(id: number): Promise<Room> {
    return this.http
      .get<Room>(`${environment.BASE_URI}/${ApiPath.rooms}/${id}`)
      .toPromise();
  }

  async fetchAllRooms(): Promise<Room[]> {
    return this.http
      .get<Room[]>(`${environment.BASE_URI}/${ApiPath.rooms}`)
      .toPromise();
  }

  async createRoom(roomDto: RoomDto): Promise<any> {
    return this.http
      .post<Room>(`${environment.BASE_URI}/${ApiPath.rooms}`, roomDto)
      .toPromise();
  }

  async fetchAvailableRooms(toDate: string, fromDate: string): Promise<Room[]> {
    const longDate = new Date().setFullYear(new Date().getFullYear() + 1);
    const longDateStr = this.datePipe.transform(longDate,'yyyy-MM-dd');
    const params = new HttpParams().set('fromDate', fromDate).set('toDate',toDate ? toDate : longDateStr || '');


    return this.http
      .get<Room[]>(
        `${environment.BASE_URI}/${ApiPath.rooms}/${ApiPath.AvailableRooms}`,
        {
          params,
        }
      )
      .toPromise();
  }

  async updateRoomById(id: number, roomDto: RoomDto): Promise<boolean> {
    return this.http
      .patch<boolean>(`${environment.BASE_URI}/${ApiPath.rooms}/${id}`, roomDto)
      .toPromise();
  }

  async deleteRoomById(id: number): Promise<boolean> {
    return this.http
      .delete<boolean>(`${environment.BASE_URI}/${ApiPath.rooms}/${id}`)
      .toPromise();
  }

  async fetchRoomTypes(): Promise<RoomType[]> {
    return this.http
      .get<RoomType[]>(`${environment.BASE_URI}/${ApiPath.roomTypes}`)
      .toPromise();
  }

  async fetchRoomStatus(): Promise<RoomStatus[]> {
    return this.http
      .get<RoomStatus[]>(`${environment.BASE_URI}/${ApiPath.roomStatus}`)
      .toPromise();
  }
}
