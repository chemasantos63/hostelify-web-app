import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Roomer } from '../components/roomer/roomer.component';
import { ApiPath } from '../shared/endpoints';

export interface RoomerDto {
  name: string;
  lastname: string;
  identification: string;
  nationality: string;
  origin: string;
  destination: string;
  occupation: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoomerService {
  constructor(private readonly http: HttpClient) {}

  async fetchAllRoomers(): Promise<Roomer[]> {
    return this.http
      .get<Roomer[]>(`${environment.BASE_URI}/${ApiPath.roomers}`)
      .toPromise();
  }

  async createRoomer(roomerDto: RoomerDto): Promise<any> {
    return this.http
      .post<Roomer>(
        `${environment.BASE_URI}/${ApiPath.roomers}`,
        roomerDto
      )
      .toPromise();
  }

  async updateRoomerById(id: number, roomerDto: RoomerDto): Promise<boolean> {
   return this.http
      .patch<boolean>(
        `${environment.BASE_URI}/${ApiPath.roomers}`,
        roomerDto
      )
      .toPromise();
  }

  async deleteRoomerById(id: number): Promise<boolean> {
 return this.http
      .delete<boolean>(
        `${environment.BASE_URI}/${ApiPath.roomers}/${id}`
      )
      .toPromise();
  }
}
