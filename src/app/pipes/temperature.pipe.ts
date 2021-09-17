import { TemperatureType, TemperatureTypeSymbol } from './../interfaces/temperature-type';
import { Pipe, PipeTransform } from '@angular/core';
import { round } from "lodash-es";

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(temperature: number, temperatureType: TemperatureType): string {
    if (temperatureType === TemperatureType.Fahrenheit) {
      temperature = temperature * 9/5 + 32; // calculation to fahrenheit
      temperature = round(temperature, 1); // round to 2 digits precision
    }

    return `${temperature}\u00B0${TemperatureTypeSymbol[temperatureType]}`;
  }

}
