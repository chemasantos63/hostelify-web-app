import { Room } from './../room.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from './../../../services/room.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-update-room',
  templateUrl: './create-update-room.component.html',
  styleUrls: ['./create-update-room.component.sass'],
})
export class CreateUpdateRoomComponent implements OnInit {
  createUpdateRoomForm: FormGroup;
  creatingRoom = true;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) public data: { room: Room }
  ) {
    this.createUpdateRoomForm = this.formBuilder.group({
      number: data ? data.room.rNumber : '',
      type: data ? data.room.type : '',
      location: data ? data.room.location : '',
    });

    if (data) {
      this.creatingRoom = false;
    }
  }
  async handleSubmit() {
    if (this.creatingRoom) {
      await this.roomService.createRoom(this.createUpdateRoomForm.value);
    } else {
    }
  }
  ngOnInit(): void {}
}
