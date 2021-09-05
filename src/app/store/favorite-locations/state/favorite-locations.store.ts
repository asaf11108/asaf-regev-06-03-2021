import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FavoriteLocation } from './favorite-location.model';

export interface FavoriteLocationsState extends EntityState<FavoriteLocation>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'favorite-locations', idKey: 'key' })
export class FavoriteLocationsStore extends EntityStore<FavoriteLocationsState> {

  constructor() {
    super();
    const key = '215854';
    this.add({
      key,
      localizedName: 'Tel Aviv',
      weatherText: '',
      temperature: 25,
      icon: '', 
      forecasts: [],
      isFavorite: false
    });
    this.setActive(key)
  }

}
