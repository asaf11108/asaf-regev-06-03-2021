import { GeopositionSearch } from '../interfaces/api/geoposition-search';
import { IApiService } from './api,interface';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AutocompleteOption } from "../interfaces/api/autocomplete";
import { tap } from 'rxjs/operators';
import { CurrentConditions } from '../interfaces/api/current-conditions';
import { SearchByLocationKey } from '../interfaces/api/search-by-location-key';


@Injectable()
export class ApiService implements IApiService {

  getAutoComplete(query: string): Observable<AutocompleteOption[]> {
    if ('tel aviv'.toLowerCase().includes(query.toLowerCase())) {
      return of([{ "Version": 1, "Key": "215854", "Type": "City", "Rank": 31, "LocalizedName": "Tel Aviv", "Country": { "ID": "IL", "LocalizedName": "Israel" }, "AdministrativeArea": { "ID": "TA", "LocalizedName": "Tel Aviv" } }]);
    } else if ('paris'.toLowerCase().includes(query.toLowerCase())) {
      return of([{ "Version": 1, "Key": "623", "Type": "City", "Rank": 20, "LocalizedName": "Paris", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133785", "Type": "City", "Rank": 45, "LocalizedName": "Paris 10e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133786", "Type": "City", "Rank": 45, "LocalizedName": "Paris 11e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133787", "Type": "City", "Rank": 45, "LocalizedName": "Paris 12e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133788", "Type": "City", "Rank": 45, "LocalizedName": "Paris 13e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133789", "Type": "City", "Rank": 45, "LocalizedName": "Paris 14e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133790", "Type": "City", "Rank": 45, "LocalizedName": "Paris 15e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "2258521", "Type": "City", "Rank": 45, "LocalizedName": "Paris 16e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133791", "Type": "City", "Rank": 45, "LocalizedName": "Paris 17e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133792", "Type": "City", "Rank": 45, "LocalizedName": "Paris 18e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }]);
    } else {
      return of([]);
    }
  }

  getCurrentConditions(key: string): Observable<CurrentConditions> {
    const res: CurrentConditions = [
      {
        "LocalObservationDateTime": "2021-09-15T17:21:00+03:00",
        "EpochTime": 1631715660,
        "WeatherText": "Clouds and sun",
        "WeatherIcon": 4,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": true,
        "Temperature": {
          "Metric": {
            "Value": 29.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 85,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/yanuh/214356/current-weather/214356?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/yanuh/214356/current-weather/214356?lang=en-us"
      }
    ];
    return of(res);
  }

  getGeopositionSearch(latitude: number, longitude: number): Observable<GeopositionSearch> {
    const res: GeopositionSearch = {
      "Version": 1,
      "Key": "214356",
      "Type": "City",
      "Rank": 75,
      "LocalizedName": "Yanuh",
      "EnglishName": "Yanuh",
      "PrimaryPostalCode": "",
      "Region": {
        "ID": "MEA",
        "LocalizedName": "Middle East",
        "EnglishName": "Middle East"
      },
      "Country": {
        "ID": "IL",
        "LocalizedName": "Israel",
        "EnglishName": "Israel"
      },
      "AdministrativeArea": {
        "ID": "Z",
        "LocalizedName": "Northern District",
        "EnglishName": "Northern District",
        "Level": 1,
        "LocalizedType": "District",
        "EnglishType": "District",
        "CountryID": "IL"
      },
      "TimeZone": {
        "Code": "IDT",
        "Name": "Asia/Jerusalem",
        "GmtOffset": 3,
        "IsDaylightSaving": true,
        "NextOffsetChange": "2021-10-30T23:00:00Z"
      },
      "GeoPosition": {
        "Latitude": 32.985,
        "Longitude": 35.251,
        "Elevation": {
          "Metric": {
            "Value": 462,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 1515,
            "Unit": "ft",
            "UnitType": 0
          }
        }
      },
      "IsAlias": false,
      "SupplementalAdminAreas": [],
      "DataSets": [
        "AirQualityCurrentConditions",
        "AirQualityForecasts",
        "Alerts",
        "ForecastConfidence"
      ]
    };
    return of(res);
  }

  getSearchByLocationKey(key: string): Observable<SearchByLocationKey> {
    const res = {
      "Version": 1,
      "Key": "215854",
      "Type": "City",
      "Rank": 31,
      "LocalizedName": "Tel Aviv",
      "EnglishName": "Tel Aviv",
      "PrimaryPostalCode": "",
      "Region": {
        "ID": "MEA",
        "LocalizedName": "Middle East",
        "EnglishName": "Middle East"
      },
      "Country": {
        "ID": "IL",
        "LocalizedName": "Israel",
        "EnglishName": "Israel"
      },
      "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv",
        "EnglishName": "Tel Aviv",
        "Level": 1,
        "LocalizedType": "District",
        "EnglishType": "District",
        "CountryID": "IL"
      },
      "TimeZone": {
        "Code": "IDT",
        "Name": "Asia/Jerusalem",
        "GmtOffset": 3,
        "IsDaylightSaving": true,
        "NextOffsetChange": "2021-10-30T23:00:00Z"
      },
      "GeoPosition": {
        "Latitude": 32.045,
        "Longitude": 34.77,
        "Elevation": {
          "Metric": {
            "Value": 34,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 111,
            "Unit": "ft",
            "UnitType": 0
          }
        }
      },
      "IsAlias": false,
      "SupplementalAdminAreas": [],
      "DataSets": [
        "AirQualityCurrentConditions",
        "AirQualityForecasts",
        "Alerts",
        "ForecastConfidence"
      ]
    }
    return of(res);
  }
}
