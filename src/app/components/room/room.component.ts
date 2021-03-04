import { RoomService } from './../../services/room.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent implements OnInit {
  roomForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService
  ) {
    this.roomForm = this.formBuilder.group({
      number: -1,
      type: -1,
      location: ''
    })
  }
  async handleSubmit(){
    await this.roomService.createRoom(
      this.roomForm.value.number,
      this.roomForm.value.type,
      this.roomForm.value.location
    )
  }
  ngOnInit(): void {}
}
