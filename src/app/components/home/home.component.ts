import { ApiService } from '../../services/api-mock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherLocationsService } from './../../state/weather-locations/weather-locations.service';
import { WeatherLocationsQuery } from './../../state/weather-locations/weather-locations.query';
import { WeatherLocation, Coordinates } from './../../state/weather-locations/weather-location.model';
import { map, switchMap, catchError, tap, filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, from, Observable, of, OperatorFunction, pipe, ReplaySubject, Subject } from 'rxjs';
import { Location } from "../../state/weather-locations/weather-location.model";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  form = new FormGroup({
    query: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/),
    ]),
  });
  controls = {
    query: this.form.get('query'),
  };
  
  selectedOption$ = new Subject<Location>();
  weatherLocation$ = new ReplaySubject<WeatherLocation>(1);

  constructor(
    public weatherLocationsQuery: WeatherLocationsQuery,
    private weatherLocationsService: WeatherLocationsService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCoordinates({maximumAge:10000, timeout:5000, enableHighAccuracy: true}).pipe(
      this.updateSelectedOption(),
      this.updateWeatherLocation()
    ).subscribe();
  }
  
  onSelectionChange(selectedOption: Location): void {
    of(selectedOption).pipe(this.updateWeatherLocation()).subscribe();
  }
  
  private getCoordinates(options?: PositionOptions): Observable<GeolocationCoordinates> {
    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options)
        } else { 
          reject();
        }
    })).pipe(
      map(geolocationPosition => geolocationPosition.coords),
      catchError(() => {
        this.snackBar.open('Geolocation is not supported by this browser.', '', { duration: 5000 });
        return EMPTY;
      })
    );
  }

  private updateSelectedOption(): OperatorFunction<Coordinates, Location> {
    return pipe(
      switchMap(({ latitude, longitude }) => this.apiService.getGeopositionSearch(latitude, longitude)),
      filter(Boolean),
      map(({ Key, LocalizedName, GeoPosition }) => ({
        key: Key,
        localizedName: LocalizedName,
        coordinates: { latitude: GeoPosition.Latitude, longitude: GeoPosition.Longitude }
      })),
      tap((location) => this.selectedOption$.next(location))
    );
  }

  private updateWeatherLocation(): OperatorFunction<Location, WeatherLocation> {
    return pipe(
      switchMap((location) => this.weatherLocationsService.getWeather(location)),
      tap(weather => this.weatherLocation$.next(weather))
    );
  }
}
