import { ISOString } from "../general";
import { Temperature } from "./shared";

export interface CurrentCondition {
  LocalObservationDateTime: ISOString;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType?: any;
  IsDayTime: boolean;
  Temperature: Temperature;
  MobileLink: string;
  Link: string;
}

export type CurrentConditions = CurrentCondition[];