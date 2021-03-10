import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Roomer } from '../components/roomer/roomer.component';
import { ApiPath } from '../shared/endpoints';

export interface RoomerDto{
  id: number;
  names: string;
  lastNames: string;
  documentNumber: string;
  nacionality: string;
  provenance: string;
  destiny: string;
  occupation: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoomerService {
  constructor(private readonly http:HttpClient) {}
 
  async fetchAllRoomers(): Promise<Roomer[]>{
    const token = localStorage.getItem('currentToken');
    const headers = new HttpHeaders().set(`Authorization`,`Bearer ${token}`);

    return this.http.get<Roomer[]>(`${environment.BASE_URI}/${ApiPath.GetAllRoomers}`,{
      headers,
    }).toPromise();
  }
  
  async createRoomer(roomerDto:RoomerDto):Promise<any> {
    const token = localStorage.getItem('currentToken');

    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`);

    return this.http.post<Roomer>(
      `${environment.BASE_URI}/${ApiPath.GetAllRoomers}`,
    roomerDto,{headers}).toPromise();
  }
  }

