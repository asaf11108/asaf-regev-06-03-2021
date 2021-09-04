import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FavoriteLocationsQuery } from '../../store/favorite-locations/state/favorite-locations.query';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private favoriteLocationsQuery: FavoriteLocationsQuery) { }

  ngOnInit(): void {
    this.isLoading$ = this.favoriteLocationsQuery.selectLoading().pipe(delay(0));
  }

}
