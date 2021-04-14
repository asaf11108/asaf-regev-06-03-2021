import { ForecastData } from './../forecast/forecast.data';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FavoriteLocationService } from '../../store2/favorite-location/favorite-location.service';
import { FavoriteLocation } from '../../store2/favorite-location/favorite-location';

@Component({
  selector: 'app-favorits',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritsComponent implements OnInit {
  favoriteLocations$: Observable<FavoriteLocation[]>;

  constructor(
    private favoriteLocationService: FavoriteLocationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.favoriteLocations$ = this.favoriteLocationService.entities$.pipe(map(favoriteLocations => favoriteLocations.filter(favoriteLocation => favoriteLocation.isFavorite)));
  }

  forecastClick(favoriteLocation: FavoriteLocation): void {
    this.favoriteLocationService.activeEntityId = favoriteLocation.id;
    this.router.navigate(['/home']);
  }

  mapToForecastComponent(favoriteLocation: FavoriteLocation): ForecastData {
    return ({ title: favoriteLocation.locationName, temperature: favoriteLocation.temperature, icon: favoriteLocation.icon })
  }
}
