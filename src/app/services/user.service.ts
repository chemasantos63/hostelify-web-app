import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPath } from '../shared/endpoints';
import { User } from './auth.service';


export interface UserDto {
  username: string;
  email: string;
  password: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  async fetchUserById(id: number): Promise<User> {
    return this.http
      .get<User>(`${environment.BASE_URI}/${ApiPath.Users}/${id}`)
      .toPromise();
  }

  async fetchAllUsers(): Promise<User[]> {
    return this.http
      .get<User[]>(`${environment.BASE_URI}/${ApiPath.Users}`)
      .toPromise();
  }

  async createUser(userDto: UserDto): Promise<User> {
    return this.http
      .post<User>(`${environment.BASE_URI}/${ApiPath.Users}`, userDto)
      .toPromise();
  }

  async updateUserById(id: number, userDto: UserDto): Promise<boolean> {
    return this.http
      .patch<boolean>(
        `${environment.BASE_URI}/${ApiPath.Signup}/${id}`,
        userDto
      )
      .toPromise();
  }

  async deleteUserById(id: number): Promise<boolean> {
    return this.http
      .delete<boolean>(`${environment.BASE_URI}/${ApiPath.Users}/${id}`)
      .toPromise();
  }
}
