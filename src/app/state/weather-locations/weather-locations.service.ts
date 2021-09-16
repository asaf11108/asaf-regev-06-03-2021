import { CurrentConditions } from './../../interfaces/current-conditions';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { WeatherLocation, Coordinates } from './weather-location.model';
import { WeatherLocationsStore } from './weather-locations.store';
import { ApiService } from './../../services/api.mock.service';
import { Location } from './weather-location.model';
import { withTransaction } from '@datorama/akita';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherLocationsService {
  constructor(
    private weatherLocationsStore: WeatherLocationsStore,
    private apiService: ApiService
  ) {}

  getWeather({ key, localizedName }: Location, coordinates: Coordinates): Observable<WeatherLocation> {
    this.weatherLocationsStore.setLoading(true);
    return this.apiService.getCurrentConditions(key).pipe(
      map<CurrentConditions, WeatherLocation>((res) => {
        const currentConditions = res[0];
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
