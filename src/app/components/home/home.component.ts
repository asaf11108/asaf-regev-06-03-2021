import { ApiService } from './../../services/api.mock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherLocationsService } from './../../state/weather-locations/weather-locations.service';
import { WeatherLocationsQuery } from './../../state/weather-locations/weather-locations.query';
import { WeatherLocation, Coordinates } from './../../state/weather-locations/weather-location.model';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EMPTY, from, Observable } from 'rxjs';
import { Location } from "../../state/weather-locations/weather-location.model";
import { HttpResponse } from 'src/app/interfaces/geoposition-search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  selectedOption: Location;
  weatherLocation$: Observable<WeatherLocation>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private weatherLocationsQuery: WeatherLocationsQuery,
    private weatherLocationsService: WeatherLocationsService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    from(this.getGeolocation()).pipe(map(
      geolocationPosition => geolocationPosition.coords),
      catchError(() => {
        this.snackBar.open('Geolocation is not supported by this browser.', '', { duration: 2000 });
        return EMPTY;
      }),
      switchMap(({ latitude, longitude }) => this.apiService.getGeopositionSearch(latitude, longitude)),
      map<HttpResponse.GeopositionSearch, {location: Location, coordinates: Coordinates}>(({ Key, LocalizedName, GeoPosition }) => ({
        location: { key: Key, localizedName: LocalizedName },
        coordinates: { latitude: GeoPosition.Latitude, longitude: GeoPosition.Longitude }
      })),
      tap(({ location }) => this.selectedOption = location),
      switchMap(({ location, coordinates }) => this.weatherLocationsService.getWeather(location, coordinates)),
      tap(console.log),
      tap(() => this.cdr.markForCheck())
    ).subscribe();
    this.isLoading$ = this.weatherLocationsQuery.selectLoading();
    this.error$ = this.weatherLocationsQuery.selectError();
  }
  
  onSelectionChange(selectedOption: Location): void {
    // this.weatherLocationsService.getWeather(selectedOption);
  }
  
  private getGeolocation(options?: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      } else { 
        reject();
      }
    });
  }
}
