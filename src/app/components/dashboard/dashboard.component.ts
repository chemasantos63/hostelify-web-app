import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { getRoomsNumber } from 'src/app/shared/utils';
import { Reservation } from '../reservation/reservation.component';
import { Room, RoomStatus } from '../room/room.component';
import { ReservationService } from './../../services/reservation.service';
export interface ReservationDashboard {
  rooms: string;
  customer: string;
  roomersQty: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  username: string = '';

  roomsByStatus: any[];
  statusToIgnore: string[];
  reservations: Reservation[];
  isLoading: boolean;
  reservationsDataSource: MatTableDataSource<ReservationDashboard>;
  columnsForReservationTable: string[];

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private router: Router
  ) {
    //@ts-ignore
    this.username = this.authService.currentUserValue.username;
    this.reservations = [];
    this.roomsByStatus = [];
    this.statusToIgnore = [`Inactiva`, `Activa`];
    this.isLoading = false;
    this.reservationsDataSource = new MatTableDataSource();
    this.columnsForReservationTable = [
      `rooms`,
      `customer`,
      `roomersQty`,
      `actions`,
    ];
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    this.reservations = await this.reservationService.fetchTodayReservations();
    this.reservationsDataSource = new MatTableDataSource(
      this.parseReservationData(this.reservations)
    );

    const roomStatus = await this.roomService.fetchRoomStatus();

    const rooms = await this.roomService.fetchAllRooms();

    this.roomsByStatus = this.groupRoomsByStatus(roomStatus, rooms);

    this.isLoading = false;
  }

  private groupRoomsByStatus(roomStatus: RoomStatus[], rooms: Room[]) {
    let tempMap: any[] = [];

    for (const status of roomStatus) {
      if (!this.statusToIgnore.includes(status.description)) {
        tempMap = [
          ...tempMap,
          {
            statusDescription: status.description,
            quantity: rooms.filter((r) => r.status.id === status.id).length,
          },
        ];
      }
    }
    return tempMap;
  }

  private parseReservationData(
    reservations: Reservation[]
  ): ReservationDashboard[] {
    return this.reservations.map((r) => ({
      rooms: getRoomsNumber(r),
      customer: `${r.customer.name} ${r.customer.lastname}`,
      roomersQty: `${r.roomersQty}`,
      reservation: r,
    }));
  }

  async handleCheckIn(rowIndex: number): Promise<void> {
    localStorage.setItem(
      'reservationToCreatePermananence',
      JSON.stringify(this.reservations[rowIndex])
    );
    this.router.navigate(['/permanence', this.reservations[rowIndex].id]);
    console.log(this.reservations[rowIndex]);
  }
}
