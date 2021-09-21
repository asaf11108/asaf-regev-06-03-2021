import { CurrentConditions } from './../../interfaces/api/current-conditions';
import { Injectable } from '@angular/core';
import { map, tap, filter } from 'rxjs/operators';
import { WeatherLocation, Coordinates } from './weather-location.model';
import { WeatherLocationsStore } from './weather-locations.store';
import { ApiService } from './../../services/api.mock.service';
import { Location } from './weather-location.model';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherLocationsService {
  constructor(
    private weatherLocationsStore: WeatherLocationsStore,
    private apiService: ApiService
  ) {}

  getWeather({
    key,
    localizedName,
    coordinates,
  }: Location): Observable<WeatherLocation> {
    return forkJoin([
      this.apiService.getCurrentConditions(key),
      this.getCoordinates(key, coordinates),
    ]).pipe(
      filter(([currentConditions]) => !!currentConditions.length),
      map<[CurrentConditions, Coordinates], WeatherLocation>(
        ([currentConditions, coordinates]) => {
          const currentCondition = currentConditions[0];
          return {
            key,
            localizedName,
            coordinates,
            temperature: currentCondition.Temperature.Metric.Value,
            weatherText: currentCondition.WeatherText,
            weatherIcon: currentCondition.WeatherIcon,
          };
        }
      ),
      tap((favoriteLocation) => {
        this.weatherLocationsStore.upsert(
          favoriteLocation.key,
          favoriteLocation
        );
      })
    );
  }

  private getCoordinates(
    key: string,
    coordinates: Coordinates
  ): Observable<Coordinates> {
    return coordinates
      ? of(coordinates)
      : this.apiService.getSearchByLocationKey(key).pipe(
          map((searchByLocationKey) => searchByLocationKey.GeoPosition),
          map(({ Latitude: latitude, Longitude: longitude }) => ({
            latitude,
            longitude,
          }))
        );
  }
}
