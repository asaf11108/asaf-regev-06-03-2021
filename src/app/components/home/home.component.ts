import { ApiService } from './../../services/api.mock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherLocationsService } from './../../state/weather-locations/weather-locations.service';
import { WeatherLocationsQuery } from './../../state/weather-locations/weather-locations.query';
import { WeatherLocation, Coordinates } from './../../state/weather-locations/weather-location.model';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EMPTY, from, MonoTypeOperatorFunction, Observable, OperatorFunction, pipe, Subject } from 'rxjs';
import { Location } from "../../state/weather-locations/weather-location.model";
import { HttpResponse } from 'src/app/interfaces/geoposition-search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  selectedOption$ = new Subject<Location>();
  weatherLocation$ = new Subject<WeatherLocation>();
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private weatherLocationsQuery: WeatherLocationsQuery,
    private weatherLocationsService: WeatherLocationsService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getCoordinates().pipe(
      this.updateSelectedOption(),
      this.updateWeatherLocation()
    ).subscribe();

    this.isLoading$ = this.weatherLocationsQuery.selectLoading();
    this.error$ = this.weatherLocationsQuery.selectError();
  }
  
  onSelectionChange(selectedOption: Location): void {
    // this.weatherLocationsService.getWeather(selectedOption);
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

  private updateSelectedOption(): OperatorFunction<Coordinates, {location: Location, coordinates: Coordinates}> {
    return pipe(
      switchMap(({ latitude, longitude }) => this.apiService.getGeopositionSearch(latitude, longitude)),
      map(({ Key, LocalizedName, GeoPosition }) => ({
        location: { key: Key, localizedName: LocalizedName },
        coordinates: { latitude: GeoPosition.Latitude, longitude: GeoPosition.Longitude }
      })),
      tap(({ location }) => this.selectedOption$.next(location))
    );
  }

  private updateWeatherLocation(): OperatorFunction<{location: Location, coordinates: Coordinates}, WeatherLocation> {
    return pipe(
      switchMap(({ location, coordinates }) => this.weatherLocationsService.getWeather(location, coordinates)),
      tap(weather => this.weatherLocation$.next(weather))
    );
  }
}
