import { Reservation } from "../components/reservation/reservation.component";

export const getRoomsNumber = (reservation: Reservation) => {
  return reservation.rooms.reduce((acc, act) => `${acc}${act.roomNumber},`, ``);
};

export const regexForNumbersWithDecimal = /^[0-9]\d*(\.\d{1,4})?$/;

export const regexJustForNumbersWithoutDecimal = /^[0-9]\d*$/;
