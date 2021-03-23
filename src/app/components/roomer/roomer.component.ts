import { ToastrService } from 'ngx-toastr';
import { RoomService } from './../../services/room.service';
import { CreateUpdateRoomerComponent } from './create-update-roomer/create-update-roomer.component';
import { RoomerService } from './../../services/roomer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { promise } from 'selenium-webdriver';
export interface Roomer {
  id: number;
  names: string;
  lastNames: string;
  documentNumber: string;
  nacionality: string;
  provenance: string;
  destiny: string;
  occupation: string;
  phone: string;
}

@Component({
  selector: 'app-roomer',
  templateUrl: './roomer.component.html',
  styleUrls: ['./roomer.component.sass'],
})
export class RoomerComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private readonly roomerService: RoomerService,
    private toastr: ToastrService
  ) {}

  async openDialog(): Promise<void> {
    const dialogRef = this.dialog
      .open(CreateUpdateRoomerComponent)
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(dialogRef);
    this.showSuccessToast(dialogRef);
  }

  displayedColumns: string[] = [
    'names',
    'lastNames',
    'documentNumber',
    'nacionality',
    'provenance',
    'destination',
    'occupation',
    'phone',
  ];
  dataSource: MatTableDataSource<Roomer> = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit(): Promise<void> {
    const roomerDataSource = await this.roomerService.fetchAllRoomers;
  }

  async handleEditClick(roomer: Roomer): Promise<void> {
    const dialogRef = this.dialog
      .open(CreateUpdateRoomerComponent, {
        data: {
          roomer,
        },
      })
      .afterClosed()
      .toPromise();

      await this.refreshDataSource(dialogRef);
      this.showSuccessToast(dialogRef);
  }

  private showSuccessToast(dialogRef: any) {
    if (dialogRef){
      this.toastr.success('Huesped registrado','Operacion Exitosa')
    }
  }

  private async refreshDataSource(dialogResult: any){
    if (dialogResult) {
      this.dataSource = new MatTableDataSource(
        await this.roomerService.fetchAllRoomers()
      );
    }
  }
}
