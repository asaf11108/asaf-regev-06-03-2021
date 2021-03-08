import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ForecastData } from './forecast.data';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent implements OnInit {
  forecast: ForecastData;
  @Input() set forecastData(val: ForecastData) {
    this.forecast = { ...val, icon: this._buildIconUrl(val.icon) };
  }

  constructor() { }

  ngOnInit(): void {
  }

  onImgError(event): void {
    event.target.src = `/asaf-regev-06-03-2021${this.forecast.icon}`;
  }

  private _buildIconUrl(icon: string): string {
    if (!icon) {
      return '';
    }
    return `/assets/weather-icons/${icon}.png`;
  }

}
