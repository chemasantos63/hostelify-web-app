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
<<<<<<< HEAD
  PaymentMethods = `payment-method`,
  PermanenceTotalToPay = `totalToPay`,
=======
  PaymentMethods = `payment-method`
>>>>>>> 4945b08d72313ea303b1dda594fdbae32279e101
}
