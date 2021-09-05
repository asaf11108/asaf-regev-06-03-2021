import { Forecast } from './../../../interfaces/forecast';
import { Location } from "../../../interfaces/location";

export interface FavoriteLocation extends Location {
  weatherText: string;
  temperature: number;
  icon: string;
  forecasts: Forecast[];
  isFavorite: boolean;
}
