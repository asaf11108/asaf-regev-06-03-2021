import { API_KEY, IapiService } from './api,interface';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from "../model/location";
import { CurrentConditions } from "../model/current-conditions";
import { catchError, map } from 'rxjs/operators';
import { ForecastHttpResponse, ForecastsHttpResponse } from '../model/forecast';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements IapiService {

  HTTP_PREFIX = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getLocations(query: string): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.HTTP_PREFIX}http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${encodeURIComponent(query)}`).pipe(
      catchError(() => of([]))
    )
  }

  getCurrentConditions(key: string): Observable<CurrentConditions[]> {
    return this.http.get<CurrentConditions[]>(`${this.HTTP_PREFIX}http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`).pipe(
      catchError(() => of([]))
    )
  }

  getForecasts(key: string): Observable<ForecastHttpResponse[]> {
    return this.http.get<ForecastsHttpResponse>(`${this.HTTP_PREFIX}http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=true`).pipe(
      map(res => res.DailyForecasts),
      catchError(() => of([]))
    )
  }
}
