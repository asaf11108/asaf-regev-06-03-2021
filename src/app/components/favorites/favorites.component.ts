import { ForecastData } from './../forecast/forecast.data';
import { FavoriteLocationsStore } from '../../store/favorite-locations/state/favorite-locations.store';
import { Observable } from 'rxjs';
import { FavoriteLocation } from '../../store/favorite-locations/state/favorite-location.model';
import { FavoriteLocationsQuery } from '../../store/favorite-locations/state/favorite-locations.query';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorits',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritsComponent implements OnInit {
  favoriteLocations$: Observable<FavoriteLocation[]>;

  constructor(
    private favoriteLocationsQuery: FavoriteLocationsQuery,
    private favoriteLocationsStore: FavoriteLocationsStore,
    private router: Router) { }

  ngOnInit(): void {
    this.favoriteLocations$ = this.favoriteLocationsQuery.selectAll().pipe(map(favoriteLocations => favoriteLocations.filter(favoriteLocation => favoriteLocation.isFavorite)));
  }

  forecastClick(favoriteLocation: FavoriteLocation): void {
    this.favoriteLocationsStore.setActive(favoriteLocation.id);
    this.router.navigate(['/home']);
  }

  mapToForecastComponent(favoriteLocation: FavoriteLocation): ForecastData {
    return ({ title: favoriteLocation.locationName, temperature: favoriteLocation.temperature, icon: favoriteLocation.icon })
  }
}
