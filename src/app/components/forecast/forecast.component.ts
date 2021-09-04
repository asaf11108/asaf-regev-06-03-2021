import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/interfaces/forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent implements OnInit {
  forecast: Forecast;
  @Input('forecast') set _forecast(val: Forecast) {
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
