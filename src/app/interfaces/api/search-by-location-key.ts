import { ISOString } from '../general';

export interface Area {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
}
export type Region = Area;

export type Country = Area;

export interface AdministrativeArea {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
  Level: number;
  LocalizedType: string;
  EnglishType: string;
  CountryID: string;
}

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

export interface Elevation {
  Metric: Metric;
  Imperial: Imperial;
}

export interface GeoPosition {
  Latitude: number;
  Longitude: number;
  Elevation: Elevation;
}

export interface SearchByLocationKey {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: Region;
  Country: Country;
  AdministrativeArea: AdministrativeArea;
  TimeZone: TimeZone;
  GeoPosition: GeoPosition;
  IsAlias: boolean;
  SupplementalAdminAreas: any[];
  DataSets: string[];
}
