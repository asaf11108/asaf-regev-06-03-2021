import { FavoriteLocation } from './../../store/favorite-locations/state/favorite-location.model';
import { FavoriteLocationsStore } from './../../store/favorite-locations/state/favorite-locations.store';
import { FavoriteLocationsQuery } from './../../store/favorite-locations/state/favorite-locations.query';
import { FavoriteLocationsService } from './../../store/favorite-locations/state/favorite-locations.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from "../../interfaces/location";
import { DEFAULT_LOCATION } from './home.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  selectedOption: Location;

  favoriteLocation$: Observable<FavoriteLocation>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private favoriteLocationsQuery: FavoriteLocationsQuery,
    private favoriteLocationsService: FavoriteLocationsService,
    private favoriteLocationsStore: FavoriteLocationsStore
  ) { }

  ngOnInit(): void {
    const activeFavoriteLocation = this.favoriteLocationsQuery.getActive();
    this.selectedOption = {
      key: activeFavoriteLocation?.id ?? DEFAULT_LOCATION.key,
      localizedName: activeFavoriteLocation?.locationName ?? DEFAULT_LOCATION.localizedName
    };
    this.favoriteLocationsStore.setActive(this.selectedOption.key);
    this.favoriteLocationsService.getFavoriteData(this.selectedOption.key, this.selectedOption.localizedName);

    this.favoriteLocation$ = this.favoriteLocationsQuery.selectActive();
    this.isLoading$ = this.favoriteLocationsQuery.selectLoading();
    this.error$ = this.favoriteLocationsQuery.selectError();
  }

  onSelectionChange(selectedOption: Location): void {
    this.selectedOption = selectedOption;
    this.favoriteLocationsService.getFavoriteData(selectedOption.key, selectedOption.localizedName);
    this.favoriteLocationsStore.setActive(selectedOption.key);
  }

  onFavoriteClick(favorite: boolean): void {
    this.favoriteLocationsStore.update(this.selectedOption.key, entity => ({ ...entity, isFavorite: !favorite }));
  }

}
