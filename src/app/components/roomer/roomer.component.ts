import {
  ReservationService,
  ReservationDto,
} from './../../services/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from './../../services/room.service';
import { CreateUpdateRoomerComponent } from './create-update-roomer/create-update-roomer.component';
import { RoomerService } from './../../services/roomer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { promise } from 'selenium-webdriver';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Reservation } from '../reservation/reservation.component';
export interface Roomer {
  id: number;
  name: string;
  lastname: string;
  identification: string;
  nationality: string;
  origin: string;
  destination: string;
  occupation: string;
  phone: string;
}

@Component({
  selector: 'app-roomer',
  templateUrl: './roomer.component.html',
  styleUrls: ['./roomer.component.sass'],
})
export class RoomerComponent implements OnInit {
  selection = new SelectionModel<Roomer>(true, []);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'select',
    'name',
    'lastname',
    'identification',
    'nationality',
    // 'origin',
    // 'destination',
    'occupation',
    'phone',
  ];
  dataSource: MatTableDataSource<Roomer> = new MatTableDataSource();

  fromReservation: boolean;
  reservation: Reservation;

  constructor(
    public dialog: MatDialog,
    private readonly roomerService: RoomerService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: { fromReservation: boolean; reservation: Reservation },
    private dialogRef: MatDialogRef<RoomerComponent>,
    private reservationService: ReservationService
  ) {
    if (data) {
      this.fromReservation = data.fromReservation;
      this.reservation = data.reservation;
    } else {
      this.fromReservation = false;
      // @ts-ignore
      this.reservation = undefined;
    }
  }

  async openDialog(): Promise<void> {
    const dialogRef = await this.dialog
      .open(CreateUpdateRoomerComponent)
      .afterClosed()
      .toPromise();

    await this.refreshDataSource(dialogRef);
    this.showSuccessToast(dialogRef);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit(): Promise<void> {
    const roomerDataSource = await this.roomerService.fetchAllRoomers();
    this.dataSource = new MatTableDataSource(roomerDataSource);
    this.dataSource.paginator = this.paginator;
    if (this.fromReservation) {
      this.reservation.guest.forEach((r) =>
        this.selection.select(
          this.dataSource.data[
            this.dataSource.data.findIndex((row) => row.id === r.id)
          ]
        )
      );
    }
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
    if (dialogRef) {
      this.toastr.success('Huesped registrado', 'Operacion Exitosa');
    }
  }

  private async refreshDataSource(dialogResult: any) {
    if (dialogResult) {
      this.dataSource = new MatTableDataSource(
        await this.roomerService.fetchAllRoomers()
      );
    }
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Roomer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${1}`;
  }

  getColumnsToShow(): string[] {
    return this.fromReservation
      ? [
          'select',
          'name',
          'lastname',
          'identification',
          // 'nationality',
          // 'origin',
          // 'destination',
          // 'occupation',
          // 'phone',
        ]
      : [
          // 'select',
          'name',
          'lastname',
          'identification',
          'nationality',
          // 'origin',
          // 'destination',
          'occupation',
          'phone',
        ];
  }

  async handleAddGuestToReservationClick(): Promise<void> {
    if (this.fromReservation) {
      const {
        fromDate,
        toDate,
        customer,
        roomersQty,
        rooms,
      } = this.reservation;

      const reservationDto: ReservationDto = {
        fromDate,
        toDate,
        customerId: customer.id,
        roomersQty,
        roomIds: rooms.map((r) => r.id),
        guestIds: this.selection.selected.map((g) => g.id),
      };

      await this.reservationService.updateReservationById(
        this.reservation?.id,
        reservationDto
      );

      this.toastr.success(
        `Se agregaron los huespedes a la reservacion.`,
        `Operacion Exitosa`
      );

      this.dialogRef.close(true);
    }
  }
}
