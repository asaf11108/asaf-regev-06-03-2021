import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { FavoriteLocation } from './favorite-location';

@Injectable({ providedIn: 'root' })
export class FavoriteLocationService extends EntityCollectionServiceBase<FavoriteLocation> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FavoriteLocation', serviceElementsFactory);
  }
}
