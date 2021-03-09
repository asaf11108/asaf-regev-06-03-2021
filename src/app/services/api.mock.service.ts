import { ForecastHttpResponse } from './../model/forecast';
import { IApiService } from './api,interface';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocationHttpResponse } from "../model/location";
import { tap } from 'rxjs/operators';
import { CurrentConditions } from '../model/current-conditions';


@Injectable()
export class ApiService implements IApiService {

  constructor() { }

  getLocations(query: string): Observable<LocationHttpResponse[]> {
    if ('tel aviv'.toLowerCase().includes(query.toLowerCase())) {
      return of([{ "Version": 1, "Key": "215854", "Type": "City", "Rank": 31, "LocalizedName": "Tel Aviv", "Country": { "ID": "IL", "LocalizedName": "Israel" }, "AdministrativeArea": { "ID": "TA", "LocalizedName": "Tel Aviv" } }]);
    } else if ('paris'.toLowerCase().includes(query.toLowerCase())) {
      return of([{ "Version": 1, "Key": "623", "Type": "City", "Rank": 20, "LocalizedName": "Paris", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133785", "Type": "City", "Rank": 45, "LocalizedName": "Paris 10e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133786", "Type": "City", "Rank": 45, "LocalizedName": "Paris 11e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133787", "Type": "City", "Rank": 45, "LocalizedName": "Paris 12e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133788", "Type": "City", "Rank": 45, "LocalizedName": "Paris 13e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133789", "Type": "City", "Rank": 45, "LocalizedName": "Paris 14e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133790", "Type": "City", "Rank": 45, "LocalizedName": "Paris 15e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "2258521", "Type": "City", "Rank": 45, "LocalizedName": "Paris 16e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133791", "Type": "City", "Rank": 45, "LocalizedName": "Paris 17e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }, { "Version": 1, "Key": "133792", "Type": "City", "Rank": 45, "LocalizedName": "Paris 18e Arrondissement", "Country": { "ID": "FR", "LocalizedName": "France" }, "AdministrativeArea": { "ID": "75", "LocalizedName": "Ville de Paris" } }]);
    } else {
      return of([]);
    }
  }

  getCurrentConditions(key: string): Observable<CurrentConditions[]> {
    return of([
      {
        "LocalObservationDateTime": "2021-03-07T09:30:00+02:00",
        "EpochTime": 1615102200,
        "WeatherText": "Partly sunny",
        "WeatherIcon": 3,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": true,
        "Temperature": {
          "Metric": {
            "Value": 15.4,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 60,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
      }
    ]);
  }

  getForecasts(key: string): Observable<ForecastHttpResponse[]> {
    const forcastHttpResponse = {
      "Headline": {
        "EffectiveDate": "2021-03-11T07:00:00+02:00",
        "EffectiveEpochDate": 1615438800,
        "Severity": 5,
        "Text": "Expect showery weather Thursday morning through late Thursday night",
        "Category": "rain",
        "EndDate": "2021-03-12T07:00:00+02:00",
        "EndEpochDate": 1615525200,
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
      },
      "DailyForecasts": [
        {
          "Date": "2021-03-07T07:00:00+02:00",
          "EpochDate": 1615093200,
          "Temperature": {
            "Minimum": {
              "Value": 12.4,
              "Unit": "C",
              "UnitType": 17
            },
            "Maximum": {
              "Value": 18.2,
              "Unit": "C",
              "UnitType": 17
            }
          },
          "Day": {
            "Icon": 2,
            "IconPhrase": "Mostly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
        },
        {
          "Date": "2021-03-08T07:00:00+02:00",
          "EpochDate": 1615179600,
          "Temperature": {
            "Minimum": {
              "Value": 11.5,
              "Unit": "C",
              "UnitType": 17
            },
            "Maximum": {
              "Value": 19.3,
              "Unit": "C",
              "UnitType": 17
            }
          },
          "Day": {
            "Icon": 3,
            "IconPhrase": "Partly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 34,
            "IconPhrase": "Mostly clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
        },
        {
          "Date": "2021-03-09T07:00:00+02:00",
          "EpochDate": 1615266000,
          "Temperature": {
            "Minimum": {
              "Value": 15.5,
              "Unit": "C",
              "UnitType": 17
            },
            "Maximum": {
              "Value": 23.4,
              "Unit": "C",
              "UnitType": 17
            }
          },
          "Day": {
            "Icon": 3,
            "IconPhrase": "Partly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 34,
            "IconPhrase": "Mostly clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
        },
        {
          "Date": "2021-03-10T07:00:00+02:00",
          "EpochDate": 1615352400,
          "Temperature": {
            "Minimum": {
              "Value": 16.4,
              "Unit": "C",
              "UnitType": 17
            },
            "Maximum": {
              "Value": 25.9,
              "Unit": "C",
              "UnitType": 17
            }
          },
          "Day": {
            "Icon": 2,
            "IconPhrase": "Mostly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 34,
            "IconPhrase": "Mostly clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
        },
        {
          "Date": "2021-03-11T07:00:00+02:00",
          "EpochDate": 1615438800,
          "Temperature": {
            "Minimum": {
              "Value": 16,
              "Unit": "C",
              "UnitType": 17
            },
            "Maximum": {
              "Value": 19.8,
              "Unit": "C",
              "UnitType": 17
            }
          },
          "Day": {
            "Icon": 14,
            "IconPhrase": "Partly sunny w/ showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Night": {
            "Icon": 39,
            "IconPhrase": "Partly cloudy w/ showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
        }
      ]
    }
    return of(forcastHttpResponse.DailyForecasts);
  }
}
