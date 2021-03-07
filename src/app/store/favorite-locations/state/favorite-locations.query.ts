import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FavoriteLocationsStore, FavoriteLocationsState } from './favorite-locations.store';

@Injectable({ providedIn: 'root' })
export class FavoriteLocationsQuery extends QueryEntity<FavoriteLocationsState> {

  constructor(protected store: FavoriteLocationsStore) {
    super(store);
  }

}
