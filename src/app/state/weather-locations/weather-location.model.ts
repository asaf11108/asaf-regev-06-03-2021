import { ISOString } from "../../interfaces/general";
import { LocationHttpResponse } from "../../interfaces/autocomplete";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type Location = Record<Uncapitalize<keyof LocationHttpResponse>, string> & { coordinates?: Coordinates };

export interface WeatherLocation extends Location {
  localObservationDateTime: ISOString;
  weatherText: string;
  weatherIcon: number;
  temperature: number;
}
