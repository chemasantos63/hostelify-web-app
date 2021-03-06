import { Permanence } from './../components/permanence/permanence.component';
export enum ApiPath {
  Login = `auth/signin`,
  GetAllCustomers = `customers`,
  rooms = `rooms`,
  roomTypes = `roomTypes`,
  roomStatus = `roomStatus`,
  roomers = `guest`,
  reservations = `reservations`,
  reservationsToday = `reservations/today`,
  GetAllPermanences = `permanences`,
  GetAllBills = `billing`,
  PaymentMethods = `payment-method`,
  PermanenceTotalToPay = `totalToPay`,
  AvailableRooms= `available`,
}
