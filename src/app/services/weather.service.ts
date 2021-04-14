import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { forkJoin } from 'rxjs';
import { Forecast } from '../model/forecast';
import { FavoriteLocation } from '../store2/favorite-location/favorite-location';
import { FavoriteLocationService } from '../store2/favorite-location/favorite-location.service';
import { ApiService } from './api.mock.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  activeEntityId: FavoriteLocation['id'] = '';

  constructor(private favoriteLocationService: FavoriteLocationService, private apiService: ApiService) { }

  getFavoriteData(key: string, title: string) {
    this.favoriteLocationService.setLoading(true);
    forkJoin([
      this.apiService.getCurrentConditions(key),
      this.apiService.getForecasts(key)
    ]).subscribe(res => {
      const currentConditions = res[0][0];
      const forecasts: Forecast[] = res[1].map(forecast => ({ title: format(new Date(forecast.Date), 'EEE'), temperature: forecast.Temperature.Minimum.Value }));

      this.favoriteLocationService.addOneToCache({
        id: key,
        locationName: title,
        temperature: currentConditions.Temperature.Metric.Value,
        weatherText: currentConditions.WeatherText,
        icon: currentConditions.WeatherIcon.toString(),
        forecasts,
        isFavorite: false
      });
      this.favoriteLocationService.setLoading(false);
    });
  }
}
