import { Car } from '../interfaces/Car';

export type RootStackParamList = {
  CarsCollection: undefined;
  Profile: { username?: string } | undefined;
  Login: { redirectTo?: string; car?: Car } | undefined;
  Register: undefined;
  Booking: { car: Car };
  MyBookings: undefined;
  CarInformation: { car: Car } | undefined; 
};
