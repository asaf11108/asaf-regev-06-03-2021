import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { FavoriteLocation } from './favorite-location.model';
import { FavoriteLocationsStore } from './favorite-locations.store';

@Injectable({ providedIn: 'root' })
export class FavoriteLocationsService {

  constructor(private favoriteLocationsStore: FavoriteLocationsStore) {
  }


  add(favoriteLocation: FavoriteLocation) {
    this.favoriteLocationsStore.add(favoriteLocation);
  }

  remove(id: ID) {
    this.favoriteLocationsStore.remove(id);
  }

}
