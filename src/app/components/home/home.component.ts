import { map } from 'rxjs/operators';
import { FavoriteLocation } from './../../store/favorite-locations/state/favorite-location.model';
import { FavoriteLocationsStore } from './../../store/favorite-locations/state/favorite-locations.store';
import { FavoriteLocationsQuery } from './../../store/favorite-locations/state/favorite-locations.query';
import { FavoriteLocationsService } from './../../store/favorite-locations/state/favorite-locations.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from "../../interfaces/location";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  selectedOption$: Observable<Location>;
  favoriteLocation$: Observable<FavoriteLocation>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private favoriteLocationsQuery: FavoriteLocationsQuery,
    private favoriteLocationsService: FavoriteLocationsService,
    private favoriteLocationsStore: FavoriteLocationsStore
  ) { }

  ngOnInit(): void {
    this.selectedOption$ = this.favoriteLocationsQuery.selectActive().pipe(map(this.mapEntityToLocation));
    this.favoriteLocation$ = this.favoriteLocationsQuery.selectActive();
    this.favoriteLocationsService.getFavoriteData(this.mapEntityToLocation(this.favoriteLocationsQuery.getActive()));
    this.isLoading$ = this.favoriteLocationsQuery.selectLoading();
    this.error$ = this.favoriteLocationsQuery.selectError();
  }
  
  onSelectionChange(selectedOption: Location): void {
    this.favoriteLocationsService.getFavoriteData(selectedOption);
    this.favoriteLocationsStore.setActive(selectedOption.key);
  }
  
  onFavoriteClick(activeEntity: FavoriteLocation): void {
    this.favoriteLocationsStore.update(activeEntity.key, { isFavorite: !activeEntity.isFavorite });
  }

  private mapEntityToLocation(entity: FavoriteLocation): Location {
    return {key: entity.key, localizedName: entity.localizedName};
  }
}
