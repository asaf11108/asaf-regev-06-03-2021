import { API_KEY, IapiService } from './api,interface';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from "../model/location";
import { CurrentConditions } from "../model/current-conditions";
import { catchError, map } from 'rxjs/operators';
import { ForcastHttpResponse, Forecast } from '../model/forecast';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements IapiService {

  constructor(private http: HttpClient) { }

  getLocations(query: string): Observable<Location[]> {
    return this.http.get<Location[]>(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${encodeURIComponent(query)}`).pipe(
      catchError(() => of([]))
    )
  }

  getCurrentConditions(key: string): Observable<CurrentConditions[]> {
    return this.http.get<CurrentConditions[]>(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`).pipe(
      catchError(() => of([]))
    )
  }

  getForecasts(key: string): Observable<Forecast[]> {
    return this.http.get<ForcastHttpResponse>(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=true`).pipe(
      map(res => res.DailyForecasts),
      catchError(() => of([]))
    )
  }
}
