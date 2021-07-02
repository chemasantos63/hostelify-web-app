import { HttpClient } from '@angular/common/http';
import { FiscalInfo } from './../components/fiscal-info/fiscal-info.component';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../shared/endpoints';

export interface FiscalInfoDto {
  prefix: string;
  begin: number;
  end: number;
  cai: string;
  status: string;
  dateValidFrom: Date;
  dateValidTo: Date;
  currentNumber: number;
  range: number;
}

@Injectable({
  providedIn: 'root',
})
export class FiscalInfoService {
  constructor(private readonly http: HttpClient) {}

  async fetchInfoById(id: number): Promise<FiscalInfo> {
    return this.http
      .get<FiscalInfo>(`${environment.BASE_URI}/${ApiPath.GetAllInfo}/${id}`)
      .toPromise();
  }

  async fetchAllInfo(): Promise<FiscalInfo[]> {
    return this.http
      .get<FiscalInfo[]>(`${environment.BASE_URI}/${ApiPath.GetAllInfo}`)
      .toPromise();
  }

  async createFiscalInfo(fiscalInfoDto: FiscalInfoDto): Promise<FiscalInfo> {
    return this.http
      .post<FiscalInfo>(
        `${environment.BASE_URI}/${ApiPath.GetAllInfo}`,
        fiscalInfoDto
      )
      .toPromise();
  }

  async updateFiscalInfoById(
    id: number,
    fiscalInfoDto: FiscalInfoDto
  ): Promise<boolean> {
    return this.http
      .patch<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllInfo}/${id}`,
        fiscalInfoDto
      )
      .toPromise();
  }

  async deleteInfoById(id: number): Promise<boolean> {
    return this.http.delete<boolean>(`${environment.BASE_URI}/${ApiPath.GetAllInfo}/${id}`).toPromise();
  }
}
