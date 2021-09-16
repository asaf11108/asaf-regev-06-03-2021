import { WeatherLocationsQuery } from './../../state/weather-locations/weather-locations.query';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private weatherLocationsQuery: WeatherLocationsQuery) { }

  ngOnInit(): void {
    this.isLoading$ = this.weatherLocationsQuery.selectLoading().pipe(delay(0));
  }

}
