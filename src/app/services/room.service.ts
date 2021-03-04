import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }
  async createRoom(
    number:Number,
    type:Number,
    location:string
  ): Promise<any>{
    const body ={
      number,
      type,
      location
    }
  }
}
