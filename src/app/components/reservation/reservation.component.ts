import { promise } from 'selenium-webdriver';
import { Customer } from './../customer/customer.component';
import { CreateupdatereservationComponent } from './createupdatereservation/createupdatereservation.component';
import { ReservationService } from './../../services/reservation.service';
import { Room } from './../room/room.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
export interface Reservation {
  id: number;
  fromDate: Date;
  toDate: Date;
  customer: Customer;
  rooms: Room[];
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.sass'],
})
export class ReservationComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private readonly reservationService: ReservationService,
    private changeDetection:ChangeDetectorRef
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateupdatereservationComponent);
  }

  displayedColumns: string[] = [
    'fromDate',
    'toDate',
    'status',
    'client',
    'rooms',
    'actions',
  ];
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit(): Promise<void> {
    const reservationDataSource = await this.reservationService.fetchAllReservations();

    this.dataSource = new MatTableDataSource(reservationDataSource);
  }

  async handleEditClick(reservation: Reservation): Promise<void> {
    const dialogRef = this.dialog.open(CreateupdatereservationComponent, {
      data: {
        reservation,
      },
    }).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  async handleDeleteClick(reservation: Reservation): Promise<void> {
    const result = await this.reservationService.deleteReservationById(
      reservation.id
    );
    if (result) {
      alert('Se borro la reservacion exitosamente');
    }
  }

  getRoomsNumber(reservation: Reservation): string {
    return reservation.rooms.reduce((acc, act) => `${acc}${act.roomNumber},`, ``);
  }

  refresh() {
    this.changeDetection.detectChanges();
  }
}
