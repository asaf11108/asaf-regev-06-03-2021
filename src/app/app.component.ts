import { Observable } from 'rxjs';
import { FavoriteLocationsQuery } from './store/favorite-locations/state/favorite-locations.query';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'herolo-weather';
  isLoading$: Observable<boolean>;

  constructor(private favoriteLocationsQuery: FavoriteLocationsQuery) {}

  ngOnInit(): void {
    this.isLoading$ = this.favoriteLocationsQuery.selectLoading();
  }


}
