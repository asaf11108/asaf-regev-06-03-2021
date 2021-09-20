import { GlobalStore } from './../../state/global/global.store';
import { TemperatureType } from 'src/app/state/global/global.model';
import { TemperatureTypeSymbol } from '../../configs/temperature-type';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  TemperatureType = TemperatureType;
  TemperatureTypeSymbol = TemperatureTypeSymbol;

  constructor(private globalStore: GlobalStore) {}

  onButtonToggleChange(event: MatButtonToggleChange): void {
    this.globalStore.update({ temperatureType: event.value });
  }
}
