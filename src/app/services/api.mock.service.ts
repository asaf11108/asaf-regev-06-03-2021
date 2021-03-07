import { IapiService } from './api,interface';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from "../model/location";
import { tap } from 'rxjs/operators';
import { CurrentConditions } from '../model/current-conditions';


@Injectable({
    providedIn: 'root'
})
export class ApiService implements IapiService {

    constructor() { }

    getLocations(query: string): Observable<Location[]> {
        if (query.toLowerCase().includes('tel aviv')) {
            return of([{ "Version": 1, "Key": "215854", "Type": "City", "Rank": 31, "LocalizedName": "Tel Aviv", "Country": { "ID": "IL", "LocalizedName": "Israel" }, "AdministrativeArea": { "ID": "TA", "LocalizedName": "Tel Aviv" } }]).pipe(tap(() => console.log('test')));
        } else if (query.toLowerCase().includes('paris')) {
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
}
