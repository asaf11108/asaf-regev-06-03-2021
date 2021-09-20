import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TemperatureType } from './global.model';

export interface GlobalState {
  temperatureType: TemperatureType;
}

export function createInitialState(): GlobalState {
  return {
    temperatureType: TemperatureType.Celsius
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'global' })
export class GlobalStore extends Store<GlobalState> {

  constructor() {
    super(createInitialState());
  }

}
