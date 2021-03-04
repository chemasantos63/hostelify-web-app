import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  async singin(username:string, password:string):Promise<any>{
    
    return await this.httpClient.post(`http://192.168.2.239:5000/api/auth/signin`,{
      username,
      password
    }).toPromise();
  }
}
