import { ApiPath } from './../shared/endpoints';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../components/user-roles/user-roles.component';

export interface RoleDto {
  name: string;
  description: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private readonly http: HttpClient) {}

  async fetchRoleById(id: number): Promise<Role> {
    return this.http
      .get<Role>(`${environment.BASE_URI}/${ApiPath.GetAllRoles}/${id}`)
      .toPromise();
  }

  async fetchAllRoles(): Promise<Role[]> {
    return this.http
      .get<Role[]>(`${environment.BASE_URI}/${ApiPath.GetAllRoles}`)
      .toPromise();
  }

  async createRole(roleDto: RoleDto): Promise<Role> {
    return this.http
      .post<Role>(`${environment.BASE_URI}/${ApiPath.GetAllRoles}`, roleDto)
      .toPromise();
  }

  async updateRoleById(id: number, roleDto: RoleDto): Promise<boolean> {
    return this.http
      .patch<boolean>(
        `${environment.BASE_URI}/${ApiPath.GetAllRoles}/${id}`,
        roleDto
      )
      .toPromise();
  }

  async deleteRoleById(id: number): Promise<boolean> {
    return this.http
      .delete<boolean>(`${environment.BASE_URI}/${ApiPath.GetAllRoles}/${id}`)
      .toPromise();
  }
}
