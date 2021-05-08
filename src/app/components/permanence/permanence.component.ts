import { Reservation } from './../reservation/reservation.component';
import { Customer } from './../customer/customer.component';
import { CreateupdatepermanenceComponent } from './createupdatepermanence/createupdatepermanence.component';
import { PermanenceService } from './../../services/permanence.service';
import { Room } from './../room/room.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface Permanence {
  id: number;
  customer: Customer;
  reservation: Reservation;
  rooms: Room[];
  checkIn: Date;
  checkOut: Date;
  idCheckInUser: number;
  idCheckOutUser: number;
}

@Component({
  selector: 'app-permanence',
  templateUrl: './permanence.component.html',
  styleUrls: ['./permanence.component.sass'],
})
export class PermanenceComponent implements OnInit {
  displayedColumns: string[] = [
    'customer',
    'reservation',
    'rooms',
    'checkIn',
    'userCheckIn',
    'checkOut',
    'userCheckOut',
  ];

  dataSource: MatTableDataSource<Permanence> = new MatTableDataSource();
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private readonly permanenceService: PermanenceService
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit(): Promise<void> {
    const permanenceDataSource = await this.permanenceService.fetchAllPermanence();
    this.dataSource = new MatTableDataSource(permanenceDataSource);
    this.dataSource.paginator = this.paginator;
  }

  private async refreshDataSource(dialogResult: any) {
    if (dialogResult) {
      this.dataSource = new MatTableDataSource(
        await this.permanenceService.fetchAllPermanence()
      );
    }
    this.dataSource.paginator = this.paginator;
  }

  async handleEditClick(permanence: Permanence): Promise<void> {
    const updateDialogResult = await this.dialog
      .open(CreateupdatepermanenceComponent, { data: { permanence } })
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(updateDialogResult);
    this.showSuccessToast(updateDialogResult, `Permanencia Actualizada`);
  }

  private showSuccessToast(updateDialogResult: any, message: string): void {
    if (updateDialogResult) {
      this.toastr.success(message, 'Operación Exitosa');
    }
  }

  async openDialog(): Promise<void> {
    const createDialogResult = await this.dialog
      .open(CreateupdatepermanenceComponent)
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(createDialogResult);
    this.showSuccessToast(createDialogResult, `Registro Exitoso`);
  }

  async handleDeleteClick(permanence: Permanence): Promise<void> {
    const result = await this.permanenceService.deletePermanenceById(
      permanence.id
    );
    if (result) {
      this.toastr.success(`Registro Eliminado`, `Operacion Exitosa`);
      await this.refreshDataSource(true);
    }
  }

  getRoomsNumber(permanence: Permanence): string {
    return permanence.reservation.rooms.reduce(
      (acc, act) => `${acc}${act.roomNumber},`,
      ``
    );
  }
}
