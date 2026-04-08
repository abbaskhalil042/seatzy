export interface IAirplane {
  modelNumber: string;
  capacity: number;
}

export interface Icity {
  name: string;
}

export interface Iairport {
  name: string;
  code: string;
  address: string;
  cityId: number;
}

export interface Iflights {
  flightNumber: string;
  airplaneId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  departureTime: number;
  arrivalTime: number;
  price: number;
  boardingGate: string;
  totalSeats: number;
}
