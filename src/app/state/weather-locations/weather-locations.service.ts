import { CurrentConditions } from './../../interfaces/current-conditions';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { WeatherLocation } from './weather-location.model';
import { WeatherLocationsStore } from './weather-locations.store';
import { ApiService } from './../../services/api.mock.service';
import { Location } from './weather-location.model';
import { withTransaction } from '@datorama/akita';
import { forkJoin, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherLocationsService {
  constructor(
    private weatherLocationsStore: WeatherLocationsStore,
    private apiService: ApiService
  ) {}

  getWeather({ key, localizedName, coordinates }: Location): Observable<WeatherLocation> {
    this.weatherLocationsStore.setLoading(true);
    return forkJoin([
      this.apiService.getCurrentConditions(key),
      coordinates ? undefined : this.apiService.getSearchByLocationKey(key)
    ].filter(Boolean)).pipe(
      map<[CurrentConditions], WeatherLocation>((res) => {
        const currentConditions = res[0][0];
        return {
          key,
          localizedName,
          coordinates,
          localObservationDateTime: currentConditions.LocalObservationDateTime,
          temperature: currentConditions.Temperature.Metric.Value,
          weatherText: currentConditions.WeatherText,
          weatherIcon: currentConditions.WeatherIcon,
        };
      }),
      withTransaction<WeatherLocation>((favoriteLocation) => {
        this.weatherLocationsStore.upsert(
          favoriteLocation.key,
          favoriteLocation
        );
        this.weatherLocationsStore.setLoading(false);
      })
    );
  }
}
