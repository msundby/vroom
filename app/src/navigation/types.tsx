import { Car } from '../pages/CarsCollection';

export type RootStackParamList = {
  CarsCollection: undefined;
  Profile: { username?: string } | undefined;
  Login: { redirectTo?: string; car?: Car } | undefined;
  Register: undefined;
  Booking: { car: Car };
};
