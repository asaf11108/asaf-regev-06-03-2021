import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TemperatureType } from '../../interfaces/temperature-type';

export interface GlobalState {
  temperature: TemperatureType;
}

export function createInitialState(): GlobalState {
  return {
    temperature: TemperatureType.CELSIUS
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'global' })
export class GlobalStore extends Store<GlobalState> {

  constructor() {
    super(createInitialState());
  }

}
