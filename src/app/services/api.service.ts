import { API_KEY, IapiService } from './api,interface';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from "../model/location";
import { CurrentConditions } from "../model/current-conditions";
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements IapiService {

  constructor(private http: HttpClient) { }

  getLocations(query: string): Observable<Location[]> {
    return this.http.get<Location[]>(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${encodeURIComponent(query)}`).pipe(
      catchError(() => of([]))
    )
  }

  getCurrentConditions(key: string): Observable<CurrentConditions[]> {
    return this.http.get<CurrentConditions[]>(`http://dataservice.accuweather.com/currentconditions/v1/${key}`).pipe(
      catchError(() => of([]))
    )
  }
}
