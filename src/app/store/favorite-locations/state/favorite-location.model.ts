import { Forecast } from './../../../model/forecast';
export interface FavoriteLocation {
  id: string;
  title: string;
  weatherText: string;
  temperature: number;
  icon: string;
  forecasts: Forecast[];
  favorite: boolean;
}
