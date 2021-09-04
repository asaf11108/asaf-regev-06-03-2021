import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FavoriteLocation } from './favorite-location.model';

export interface FavoriteLocationsState extends EntityState<FavoriteLocation>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'favorite-locations' })
export class FavoriteLocationsStore extends EntityStore<FavoriteLocationsState> {

  constructor() {
    super();
  }

}
