import { ISOString } from "../../interfaces/general";
import { LocationHttpResponse } from "../../interfaces/location";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type Location = Record<Uncapitalize<keyof LocationHttpResponse>, string>;

export interface WeatherLocation extends Location {
  coordinates: Coordinates;
  localObservationDateTime: ISOString;
  weatherText: string;
  weatherIcon: number;
  temperature: number;
}
