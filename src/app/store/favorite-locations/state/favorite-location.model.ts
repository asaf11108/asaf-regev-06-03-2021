import { Forecast } from './../../../interfaces/forecast';
export interface FavoriteLocation {
  id: string;
  locationName: string;
  weatherText: string;
  temperature: number;
  icon: string;
  forecasts: Forecast[];
  isFavorite: boolean;
}
