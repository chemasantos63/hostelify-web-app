import { Reservation } from "../components/reservation/reservation.component";

export const getRoomsNumber = (reservation: Reservation) => {
  return reservation.rooms.reduce((acc, act) => `${acc}${act.roomNumber},`, ``);
};
