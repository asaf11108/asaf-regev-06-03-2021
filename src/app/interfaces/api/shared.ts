import { ISOString } from "../general";

export interface Area {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  }
  export type Region = Area;
  
  export type Country = Area;
  
  export interface AdministrativeArea extends Area {
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
  }

  export type AreaPick<T extends Area> = Pick<T, 'ID' | 'LocalizedName'>;
  
  export interface TimeZone {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: ISOString;
  }
  
  export interface TemperatureType {
    Value: number;
    Unit: string;
    UnitType: number;
  }
  
  export type Metric = TemperatureType;
  
  export type Imperial = TemperatureType;

  export interface TemperatureUnits {
      Metric: Metric;
      Imperial: Imperial;
  }
  
  export type Elevation = TemperatureUnits;
  export type Temperature = TemperatureUnits;
  
  export interface GeoPosition {
    Latitude: number;
    Longitude: number;
    Elevation: Elevation;
  }