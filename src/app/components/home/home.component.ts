import { switchMap, map, distinctUntilChanged } from 'rxjs/operators';
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
    
    this.selectedOption$ = this.favoriteLocationsQuery.selectActive().pipe(map(entity => ({key: entity.key, localizedName: entity.localizedName})));
    this.favoriteLocation$ = this.favoriteLocationsQuery.selectActive().pipe(
      distinctUntilChanged((x, y) => x.key === y.key),
      switchMap(activeEntity => this.favoriteLocationsService.getFavoriteData(activeEntity.key, activeEntity.localizedName))
    );
    this.isLoading$ = this.favoriteLocationsQuery.selectLoading();
    this.error$ = this.favoriteLocationsQuery.selectError();
  }

  onSelectionChange(selectedOption: Location): void {
    this.favoriteLocationsService.getFavoriteData(selectedOption.key, selectedOption.localizedName);
    this.favoriteLocationsStore.setActive(selectedOption.key);
  }

  onFavoriteClick(activeEntity: FavoriteLocation): void {
    this.favoriteLocationsStore.update(activeEntity.key, { isFavorite: !activeEntity.isFavorite });
  }

}
