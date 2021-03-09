import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiPath } from '../shared/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  async singin(username: string, password: string): Promise<any> {
    return await this.httpClient
      .post(`${environment.BASE_URI}/${ApiPath.Login}`, {
        username,
        password,
      })
      .toPromise();
  }
}
