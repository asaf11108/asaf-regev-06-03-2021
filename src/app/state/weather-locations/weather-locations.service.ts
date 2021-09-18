import { CurrentConditions } from './../../interfaces/current-conditions';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { WeatherLocation } from './weather-location.model';
import { WeatherLocationsStore } from './weather-locations.store';
import { ApiService } from './../../services/api.mock.service';
import { Location } from './weather-location.model';
import { withTransaction } from '@datorama/akita';
import { forkJoin, Observable } from 'rxjs';
import { SearchByLocationKey } from 'src/app/interfaces/search-by-location-key';

@Injectable({ providedIn: 'root' })
export class WeatherLocationsService {
  constructor(
    private weatherLocationsStore: WeatherLocationsStore,
    private apiService: ApiService
  ) {}

  getWeather({ key, localizedName, coordinates }: Location): Observable<WeatherLocation> {
    return forkJoin([
      this.apiService.getCurrentConditions(key),
      coordinates ? undefined : this.apiService.getSearchByLocationKey(key)
    ].filter(Boolean)).pipe(
      map<[CurrentConditions, SearchByLocationKey], WeatherLocation>(([currentConditions, searchByLocationKey]) => {
        const currentCondition = currentConditions[0];
        if (!coordinates) {
          const {Latitude: latitude, Longitude: longitude} = searchByLocationKey?.GeoPosition;
          coordinates = { latitude, longitude };
        }
        return {
          key,
          localizedName,
          coordinates,
          localObservationDateTime: currentCondition.LocalObservationDateTime,
          temperature: currentCondition.Temperature.Metric.Value,
          weatherText: currentCondition.WeatherText,
          weatherIcon: currentCondition.WeatherIcon,
        };
      }),
      withTransaction<WeatherLocation>((favoriteLocation) => {
        this.weatherLocationsStore.upsert(
          favoriteLocation.key,
          favoriteLocation
        );
      })
    );
  }
}
