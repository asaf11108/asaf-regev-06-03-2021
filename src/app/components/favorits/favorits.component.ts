import { Observable } from 'rxjs';
import { FavoriteLocation } from './../../store/favorite-locations/state/favorite-location.model';
import { FavoriteLocationsQuery } from './../../store/favorite-locations/state/favorite-locations.query';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorits',
  templateUrl: './favorits.component.html',
  styleUrls: ['./favorits.component.scss']
})
export class FavoritsComponent implements OnInit {
  favoriteLocations$: Observable<FavoriteLocation[]>;

  constructor(private favoriteLocationsQuery: FavoriteLocationsQuery) { }

  ngOnInit(): void {
    this.favoriteLocations$ = this.favoriteLocationsQuery.selectAll().pipe(tap(console.log));
  }

}
