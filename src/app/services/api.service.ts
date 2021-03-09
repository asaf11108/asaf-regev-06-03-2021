import { ApiService as ApiMockService } from './api.mock.service';
import { FavoriteLocationsStore } from './../store/favorite-locations/state/favorite-locations.store';
import { API_KEY, IapiService } from './api,interface';
import { EMPTY, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationHttpResponse } from "../model/location";
import { CurrentConditions } from "../model/current-conditions";
import { catchError, map } from 'rxjs/operators';
import { ForecastHttpResponse, ForecastsHttpResponse } from '../model/forecast';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements IapiService {

  HTTP_PREFIX = 'https://cors-anywhere.herokuapp.com/';
  readonly BAD_REQUEST = 'Bad request. Switched to mock.';
  readonly apiMockService: IapiService;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private favoriteLocationsStore: FavoriteLocationsStore
  ) {
    this.apiMockService = new ApiMockService();
  }

  getLocations(query: string): Observable<LocationHttpResponse[]> {
    return this.http.get<LocationHttpResponse[]>(`${this.HTTP_PREFIX}http://dataservice.testaccuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${encodeURIComponent(query)}`).pipe(
      catchError(() => {
        this.handleError();
        return this.apiMockService.getLocations(query);
      })
    )
  }

  getCurrentConditions(key: string): Observable<CurrentConditions[]> {
    return this.http.get<CurrentConditions[]>(`${this.HTTP_PREFIX}http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`).pipe(
      catchError(() => {
        this.handleError();
        return this.apiMockService.getCurrentConditions(key);
      })
    )
  }

  getForecasts(key: string): Observable<ForecastHttpResponse[]> {
    return this.http.get<ForecastsHttpResponse>(`${this.HTTP_PREFIX}http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=true`).pipe(
      map(res => res.DailyForecasts),
      catchError(() => {
        this.handleError();
        return this.apiMockService.getForecasts(key);
      })
    )
  }

  handleError(): void {
    this._snackBar.open(this.BAD_REQUEST, '', { duration: 2000 });
    // this.favoriteLocationsStore.setError(this.BAD_REQUEST);
  }
}
