import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { WeatherLocation } from './weather-location.model';

export interface WeatherLocationsState extends EntityState<WeatherLocation, string>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'WeatherLocations', idKey: 'key' })
export class WeatherLocationsStore extends EntityStore<WeatherLocationsState> {

  constructor() {
    super();
  }

}
