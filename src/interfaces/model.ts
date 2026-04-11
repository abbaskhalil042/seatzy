import type { Op } from "sequelize";

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
  departureAirportId: string;
  arrivalAirportId: string;
  departureTime: string | Date;
  arrivalTime: string | Date;
  price: number;
  boardingGate: string;
  totalSeats: number;
}


export interface IcustomFilter {
  departureAirportId?: string;
  arrivalAirportId?: string;
  totalSeats?: {
    [Op.gte]?: number;
  };
  departureTime?: {
    [Op.between]?: any;
  };
  [Op.and]?: any[];
}