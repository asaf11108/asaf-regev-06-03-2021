import { ApiService as ApiMockService } from './api.mock.service';
import { FavoriteLocationsStore } from './../store/favorite-locations/state/favorite-locations.store';
import { IApiService } from './api,interface';
import { EMPTY, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationHttpResponse } from "../model/location";
import { CurrentConditions } from "../model/current-conditions";
import { catchError, map } from 'rxjs/operators';
import { ForecastHttpResponse, ForecastsHttpResponse } from '../model/forecast';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ApiService implements IApiService {

  readonly API_KEY = 'gRf4KNnswLuVm8mG3puAI1GUOGeJTu1v';
  readonly HTTP_PREFIX = 'https://cors-anywhere.herokuapp.com/';
  readonly ENDPOINT = 'http://dataservice.accuweather.com/';
  readonly BAD_REQUEST = ' Unable to retrieve data. Switched to mock data.';
  readonly apiMockService: IApiService;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private favoriteLocationsStore: FavoriteLocationsStore
  ) {
    this.apiMockService = new ApiMockService();
  }

  getLocations(query: string): Observable<LocationHttpResponse[]> {
    return this.http.get<LocationHttpResponse[]>(`${this.HTTP_PREFIX}${this.ENDPOINT}locations/v1/cities/autocomplete?apikey=${this.API_KEY}&q=${encodeURIComponent(query)}`).pipe(
      catchError(() => {
        this.handleError();
        return this.apiMockService.getLocations(query);
      })
    )
  }

  getCurrentConditions(key: string): Observable<CurrentConditions[]> {
    return this.http.get<CurrentConditions[]>(`${this.HTTP_PREFIX}${this.ENDPOINT}currentconditions/v1/${key}?apikey=${this.API_KEY}`).pipe(
      catchError(() => {
        this.handleError();
        return this.apiMockService.getCurrentConditions(key);
      })
    )
  }

  getForecasts(key: string): Observable<ForecastHttpResponse[]> {
    return this.http.get<ForecastsHttpResponse>(`${this.HTTP_PREFIX}${this.ENDPOINT}forecasts/v1/daily/5day/${key}?apikey=${this.API_KEY}&metric=true`).pipe(
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
