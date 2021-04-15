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
import { ToastrService } from 'ngx-toastr';

export interface Room {
  id: number;
  roomNumber: number;
  type: RoomType;
  location: string;
  status: RoomStatus;
}

export interface RoomType {
  id: number;
  type: string;
}

export interface RoomStatus {
  id: number;
  description: string;
}
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private readonly roomService: RoomService,
    private toastr: ToastrService
  ) {}

  async openDialog(): Promise<void> {
    const dialogRef = await this.dialog
      .open(CreateUpdateRoomComponent)
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(dialogRef);
    this.showSuccessToast(dialogRef);
  }

  private async refreshDataSource(dialogResult: any) {
    if (dialogResult) {
      this.dataSource = new MatTableDataSource(
        await this.roomService.fetchAllRooms()
      );
    }
  }

  private showSuccessToast(updateDialogResult: any) {
    if (updateDialogResult) {
      this.toastr.success('Habitación creada', 'Operacion Exitosa');
    }
  }

  displayedColumns: string[] = [
    'roomNumber',
    'type',
    'location',
    'actions',
    'status',
  ];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit(): Promise<void> {
    const roomsDataSource = await this.roomService.fetchAllRooms();
    this.dataSource = new MatTableDataSource(roomsDataSource);
  }

  async handleEditClick(room: Room): Promise<void> {
    const dialogRef = await this.dialog
      .open(CreateUpdateRoomComponent, {
        data: {
          room,
        },
      })
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(dialogRef);
    this.showSuccessToast(dialogRef);
  }

  async handleDeleteClick(room: Room): Promise<void> {
    const result = await this.roomService.deleteRoomById(room.id);
    if (result) {
      alert('Se borro la habitación exitosamente');
    }
  }
}
