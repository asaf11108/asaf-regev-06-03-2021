import { Forecast } from './../../../model/forecast';
import { ApiService } from './../../../services/api.service';
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


  add(favoriteLocation: FavoriteLocation) {
    this.favoriteLocationsStore.add(favoriteLocation);
  }

  remove(id: string) {
    this.favoriteLocationsStore.remove(id);
  }

  getfavoriteData(key: string, title: string) {
    this.favoriteLocationsStore.setLoading(true);
    forkJoin([
      this.apiService.getCurrentConditions(key),
      this.apiService.getForecasts(key)
    ]).pipe(untilDestroyed(this)).subscribe(res => {
      const currentConditions = res[0][0];
      const forecasts: Forecast[] = res[1].map(forecast => ({ title: format(new Date(forecast.Date), 'EEE'), temperature: forecast.Temperature.Minimum.Value }));

      this.favoriteLocationsStore.add({
        id: key,
        title,
        temperature: currentConditions.Temperature.Metric.Value,
        icon: currentConditions.WeatherText,
        forecasts,
        favorite: false
      });
      this.favoriteLocationsStore.setLoading(false);
    });
  }
}
