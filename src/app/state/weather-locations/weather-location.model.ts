import { ISOString } from '../../interfaces/general';
import { AutocompleteOption } from '../../interfaces/api/autocomplete';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type Location = Record<
  Uncapitalize<keyof Pick<AutocompleteOption, 'Key' | 'LocalizedName'>>,
  string
> & { coordinates?: Coordinates };

export interface WeatherLocation extends Location {
  weatherText: string;
  weatherIcon: number;
  temperature: number;
}
