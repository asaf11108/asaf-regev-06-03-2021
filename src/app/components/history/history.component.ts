import { WeatherLocationsQuery } from './../../state/weather-locations/weather-locations.query';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  displayedColumns = ['key', 'localizedName', 'coordinates', 'temperature'];

  constructor(public weatherLocationsQuery: WeatherLocationsQuery) { }

  ngOnInit(): void {
  }

}
