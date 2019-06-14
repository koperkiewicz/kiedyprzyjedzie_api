export interface IBusStop {
  id: number;
  number: number;
  name: string;
  latitude: number;
  longitude: number;
  location: ICoordinates;
}

export interface IBusSchedule {
  atStop: boolean;
  directionName: string;
  directionId: number;
  isEstimated: boolean;
  lineNumber: number;
  time: string;
  vehicleType: number;
}

export interface ICarier {
  name: string;
  url?: string;
  logo?: string;
  country: Country;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export enum Country {
  PL,
  CZ
}
