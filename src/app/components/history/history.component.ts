import { WeatherLocationsQuery } from './../../state/weather-locations/weather-locations.query';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { COLUMNS, FILTER_BY_COLUMN } from './history.config';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent implements OnInit {
  form = new FormGroup({
    query: new FormControl()
  });
  controls = {
    query: this.form.get('query'),
  };

  FILTER_BY_COLUMN = FILTER_BY_COLUMN;
  COLUMNS = COLUMNS;

  constructor(public weatherLocationsQuery: WeatherLocationsQuery) { }

  ngOnInit(): void {
  }

}
