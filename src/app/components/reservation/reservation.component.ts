import { promise } from 'selenium-webdriver';
import { Customer } from './../customer/customer.component';
import { CreateupdatereservationComponent } from './createupdatereservation/createupdatereservation.component';
import { ReservationService } from './../../services/reservation.service';
import { Room } from './../room/room.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
export interface Reservation {
  id: number;
  fromDate: Date;
  toDate: Date;
  customer: Customer;
  roomersQty: number;
  rooms: Room[];
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.sass'],
})
export class ReservationComponent implements OnInit {
  displayedColumns: string[] = [
    'fromDate',
    'toDate',
    'status',
    'client',
    'rooms',
    'roomersQty',
    'actions',
  ];

  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private readonly reservationService: ReservationService,
    private toastr: ToastrService
  ) {}

  async openDialog(): Promise<void> {
    const createDialogResult = await this.dialog
      .open(CreateupdatereservationComponent)
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(createDialogResult);
    this.showSuccessToast(createDialogResult, `Reservacion creada`);
  }

  private async refreshDataSource(dialogResult: any) {
    if (dialogResult) {
      this.dataSource = new MatTableDataSource(
        await this.reservationService.fetchAllReservations()
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit(): Promise<void> {
    const reservationDataSource = await this.reservationService.fetchAllReservations();

    this.dataSource = new MatTableDataSource(reservationDataSource);
  }

  async handleEditClick(reservation: Reservation): Promise<void> {
    const updateDialogResult = await this.dialog
      .open(CreateupdatereservationComponent, {
        data: {
          reservation,
        },
      })
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(updateDialogResult);
    this.showSuccessToast(updateDialogResult, `Reservacion actualizada`);
  }

  private showSuccessToast(updateDialogResult: any, message: string): void {
    if (updateDialogResult) {
      this.toastr.success(message, 'Operación Exitosa');
    }
  }

  async handleDeleteClick(reservation: Reservation): Promise<void> {
    const result = await this.reservationService.deleteReservationById(
      reservation.id
    );
    if (result) {
      this.toastr.success(`Reservacion eliminada`, 'Operación Exitosa');
      await this.refreshDataSource(true);
    }
  }

  getRoomsNumber(reservation: Reservation): string {
    return reservation.rooms.reduce(
      (acc, act) => `${acc}${act.roomNumber},`,
      ``
    );
  }
}
