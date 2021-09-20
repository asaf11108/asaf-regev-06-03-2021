import { ISOString } from "../general";

export interface TemperatureType {
  Value: number;
  Unit: string;
  UnitType: number;
}

export type Metric = TemperatureType;

export type Imperial = TemperatureType;

export interface Temperature {
  Metric: Metric;
  Imperial: Imperial;
}

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