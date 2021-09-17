import { GlobalQuery } from './../state/global/global.query';
import { TemperatureType, TemperatureTypeSymbol } from './../interfaces/temperature-type';
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { round } from "lodash-es";
import { Subscription } from 'rxjs';

@Pipe({
  name: 'temperature',
  pure: false
})
export class TemperaturePipe implements PipeTransform, OnDestroy {
  private subscription: Subscription | null = null;
  private lastTemperature: number | null = null;
  private lastValue = '';

  constructor(private cdr: ChangeDetectorRef, private globalQuery: GlobalQuery) {}

  // Reverse engineering from Transloco pipe
  // https://github.com/ngneat/transloco/blob/10c4e25cfdac4f56ecd8dabd6efeed3e08126476/projects/ngneat/transloco/src/lib/transloco.pipe.ts#L64
  transform(temperature: number): string {
    // This pipe is impure, so the following code block prevent from running the entire function
    if (temperature === this.lastTemperature) {
      return this.lastValue;
    }
    this.lastTemperature = temperature;
    // --------------------------------------------

    this.subscription && this.subscription.unsubscribe(); // Temperature is premitive value and update Value will run old value (closure)

    this.subscription = this.globalQuery.temperatureType$.subscribe(temperatureType => this.updateValue(temperature, temperatureType))

    return this.lastValue;
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private updateValue(temperature: number, temperatureType: TemperatureType): void {
    if (temperatureType === TemperatureType.Fahrenheit) {
      temperature = temperature * 9/5 + 32; // calculation to fahrenheit
      temperature = round(temperature, 1); // round to 2 digits precision
    }

    this.lastValue = `${temperature}\u00B0${TemperatureTypeSymbol[temperatureType]}`;

    this.cdr.markForCheck(); // Trigger change detection inside onPush component
  }

}
