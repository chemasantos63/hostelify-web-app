import { Room, RoomType } from './../room.component';
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
  roomTypes: RoomType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) public data: { room: Room }
  ) {
    this.createUpdateRoomForm = this.formBuilder.group({
      roomNumber: data ? data.room.roomNumber : '',
      roomTypeId: data ? data.room.type.id : '',
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
      await this.roomService.updateRoomById(
        this.data.room.id,
        this.createUpdateRoomForm.value
      );
    }
  }
  async ngOnInit(): Promise<void> {
    await this.loadRoomTypes();
  }

  async loadRoomTypes(): Promise<void> {
    this.roomTypes = await this.roomService.fetchRoomTypes();
  }
}