import { RoomType } from './../components/room/room.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../components/room/room.component';
import { ApiPath } from '../shared/endpoints';

export interface RoomDto {
  rNumber: Number;
  type: Number;
  location: string;
}
@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private readonly http: HttpClient) {}

  async fetchRoomById(id: number): Promise<Room> {
    const token = localStorage.getItem(`currentToken`);
    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .get<Room>(`${environment.BASE_URI}/${ApiPath.rooms}/${id}`, {
        headers,
      })
      .toPromise();
  }

  async fetchAllRooms(): Promise<Room[]> {
    const token = localStorage.getItem('currentToken');
    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .get<Room[]>(`${environment.BASE_URI}/${ApiPath.rooms}`, {
        headers,
      })
      .toPromise();
  }

  async createRoom(roomDto: RoomDto): Promise<any> {
    const token = localStorage.getItem('currentToken');

    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .post<Room>(`${environment.BASE_URI}/${ApiPath.rooms}`, roomDto, {
        headers,
      })
      .toPromise();
  }

  async updateRoomById(id: number, roomDto: RoomDto): Promise<boolean> {
    const token = localStorage.getItem('currentToken');

    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .patch<boolean>(`${environment.BASE_URI}/${ApiPath.rooms}/${id}`, {
        headers,
      })
      .toPromise();
  }

  async deleteRoomById(id: number): Promise<boolean> {
    const token = localStorage.getItem('currentToken');

    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .delete<boolean>(`${environment.BASE_URI}/${ApiPath.rooms}/${id}`, {
        headers,
      })
      .toPromise();
  }

  async fetchRoomTypes(): Promise<RoomType[]> {
    const token = localStorage.getItem('currentToken');

    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http
      .get<RoomType[]>(`${environment.BASE_URI}/${ApiPath.roomTypes}`, {
        headers,
      })
      .toPromise();
  }
}
