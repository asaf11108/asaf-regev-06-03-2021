import { FavoriteLocation } from './favorite-location.model';
import { Forecast } from './../../../interfaces/forecast';
import { ApiService } from './../../../services/api.mock.service';
import { Injectable } from '@angular/core';
import { FavoriteLocationsStore } from './favorite-locations.store';
import { forkJoin, Observable } from 'rxjs';
import { format } from 'date-fns';
import { withTransaction } from '@datorama/akita';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FavoriteLocationsService {

  constructor(private favoriteLocationsStore: FavoriteLocationsStore, private apiService: ApiService) {
  }

  getFavoriteData(key: string, title: string): Observable<any> {
    this.favoriteLocationsStore.setLoading(true);
    return forkJoin([
      this.apiService.getCurrentConditions(key),
      this.apiService.getForecasts(key)
    ]).pipe(
      map(res => {
        const currentConditions = res[0][0];
        const forecasts = res[1].map<Forecast>(forecast => ({ title: format(new Date(forecast.Date), 'EEE'), temperature: forecast.Temperature.Minimum.Value }));
        return {
          key,
          localizedName: title,
          temperature: currentConditions.Temperature.Metric.Value,
          weatherText: currentConditions.WeatherText,
          icon: currentConditions.WeatherIcon.toString(),
          forecasts,
          isFavorite: false
        };
      }),
      withTransaction<FavoriteLocation>(favoriteLocation => {
        this.favoriteLocationsStore.upsert(favoriteLocation.key, favoriteLocation);
        this.favoriteLocationsStore.setLoading(false);
      })
    );
  }
}
