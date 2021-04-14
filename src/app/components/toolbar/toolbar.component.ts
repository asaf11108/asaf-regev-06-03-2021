import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FavoriteLocationService } from '../../store2/favorite-location/favorite-location.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private favoriteLocationService: FavoriteLocationService) { }

  ngOnInit(): void {
    this.isLoading$ = this.favoriteLocationService.loading$.pipe(delay(0));
  }

}
