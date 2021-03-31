import { Observable } from 'rxjs';
import { FavoriteLocationsQuery } from './store/favorite-locations/state/favorite-locations.query';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'herolo-weather';

  constructor() {}

  ngOnInit(): void {
  }


}
