import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ForecastData } from './forecast.data';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent implements OnInit {
  @Input() forecast: ForecastData;

  constructor() { }

  ngOnInit(): void {
  }

}
