import { AppComponent } from './../app.component';
import { API_KEY, IapiService } from './api,interface';
import { EMPTY, Observable, of } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from "../model/location";
import { CurrentConditions } from "../model/current-conditions";
import { catchError, map } from 'rxjs/operators';
import { ForecastHttpResponse, ForecastsHttpResponse } from '../model/forecast';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements IapiService {

  HTTP_PREFIX = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getLocations(query: string): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.HTTP_PREFIX}http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${encodeURIComponent(query)}`).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  getCurrentConditions(key: string): Observable<CurrentConditions[]> {
    return this.http.get<CurrentConditions[]>(`${this.HTTP_PREFIX}http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  getForecasts(key: string): Observable<ForecastHttpResponse[]> {
    return this.http.get<ForecastsHttpResponse>(`${this.HTTP_PREFIX}http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=true`).pipe(
      map(res => res.DailyForecasts),
      catchError(this.handleError.bind(this))
    )
  }

  handleError(): Observable<any[]> {
    this._snackBar.open('Bad request', '', { duration: 2000 });
    return EMPTY;
  }
}
