import { Forecast } from './../../model/forecast';
import { ApiService } from './../../services/api.mock.service';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { FavoriteLocation } from './favorite-location';
import { format } from 'date-fns';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoriteLocationService extends EntityCollectionServiceBase<FavoriteLocation> {
  activeEntityId: FavoriteLocation['id'] = '';

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private apiService: ApiService) {
    super('FavoriteLocation', serviceElementsFactory);
  }
  
  getFavoriteData(key: string, title: string) {
    this.setLoading(true);
    forkJoin([
      this.apiService.getCurrentConditions(key),
      this.apiService.getForecasts(key)
    ]).subscribe(res => {
      const currentConditions = res[0][0];
      const forecasts: Forecast[] = res[1].map(forecast => ({ title: format(new Date(forecast.Date), 'EEE'), temperature: forecast.Temperature.Minimum.Value }));

      this.addOneToCache({
        id: key,
        locationName: title,
        temperature: currentConditions.Temperature.Metric.Value,
        weatherText: currentConditions.WeatherText,
        icon: currentConditions.WeatherIcon.toString(),
        forecasts,
        isFavorite: false
      });
      this.setLoading(false);
    });
  }
}
