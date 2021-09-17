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
  private lastValue: string = '';

  constructor(private cdr: ChangeDetectorRef, private globalQuery: GlobalQuery) {}

  transform(temperature: number): string {
    this.subscription && this.subscription.unsubscribe();

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

    this.cdr.markForCheck();
  }

}
