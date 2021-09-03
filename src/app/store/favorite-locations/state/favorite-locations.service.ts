import { Forecast } from './../../../interfaces/forecast';
import { ApiService } from './../../../services/api.mock.service';
import { Injectable } from '@angular/core';
import { FavoriteLocation } from './favorite-location.model';
import { FavoriteLocationsStore } from './favorite-locations.store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { forkJoin } from 'rxjs';
import { format } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class FavoriteLocationsService {

  constructor(private favoriteLocationsStore: FavoriteLocationsStore, private apiService: ApiService) {
  }

  getFavoriteData(key: string, title: string) {
    this.favoriteLocationsStore.setLoading(true);
    forkJoin([
      this.apiService.getCurrentConditions(key),
      this.apiService.getForecasts(key)
    ]).subscribe(res => {
      const currentConditions = res[0][0];
      const forecasts: Forecast[] = res[1].map(forecast => ({ title: format(new Date(forecast.Date), 'EEE'), temperature: forecast.Temperature.Minimum.Value }));

      this.favoriteLocationsStore.add({
        id: key,
        locationName: title,
        temperature: currentConditions.Temperature.Metric.Value,
        weatherText: currentConditions.WeatherText,
        icon: currentConditions.WeatherIcon.toString(),
        forecasts,
        isFavorite: false
      });
      this.favoriteLocationsStore.setLoading(false);
    });
  }
}
