import { RoomService } from './../../services/room.service';
import { CreateUpdateRoomComponent } from './create-update-room/create-update-room.component';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { promise } from 'selenium-webdriver';

export interface Room {
  id: number;
  rNumber: number;
  type: number;
  location: string;
}

export interface type {}
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private readonly roomService: RoomService
  ) {}

  

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateRoomComponent);
  }

  displayedColumns: string[] = ['rNumber', 'type', 'location', 'actions'];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit():Promise <void> {
    const roomsDataSource = await this.roomService.fetchAllRooms();
  }

  async handleEditClick(room: Room): Promise<void>{
    const dialogRef = this.dialog.open(CreateUpdateRoomComponent,{
      data:{
        room,
      },
    });
    }
  }
