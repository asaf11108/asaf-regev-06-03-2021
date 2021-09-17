import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WeatherLocationsStore, WeatherLocationsState } from './weather-locations.store';

@Injectable({ providedIn: 'root' })
export class WeatherLocationsQuery extends QueryEntity<WeatherLocationsState> {

  constructor(protected store: WeatherLocationsStore) {
    super(store);
  }

  loading$ = this.selectLoading();
  error$ = this.selectError()

}
