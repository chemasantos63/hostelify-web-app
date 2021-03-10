import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../components/room/room.component';
import { ApiPath } from '../shared/endpoints';


export interface RoomDto{
  rNumber: Number;
  type: Number;
  location: string;
}
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private readonly http: HttpClient) { }

async fetchAllRooms(): Promise<Room[]>{
  const token = localStorage.getItem('currentToken');
  const headers = new HttpHeaders().set(`Authorization`,`Bearer ${token}`);

  return this.http.get<Room[]>(`${environment.BASE_URI}/${ApiPath.GetAllCustomers}`,{
    headers,
  }).toPromise();
}

  async createRoom(roomDto: RoomDto): Promise<any>{
    const token = localStorage.getItem('currentToken');

    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http.post<Room>( 
    `${environment.BASE_URI}/${ApiPath.GetAllRooms}`,
    roomDto,{headers}).toPromise();
  }
}
