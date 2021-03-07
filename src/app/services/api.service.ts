import { IapiService } from './api,interface';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from "../model/location";
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements IapiService {
  readonly API_KEY = 'gRf4KNnswLuVm8mG3puAI1GUOGeJTu1v';


  constructor(private http: HttpClient) { }

  getLocations(query: string): Observable<Location[]> {
    return this.http.get<Location[]>(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.API_KEY}&q=${encodeURIComponent(query)}`).pipe(
      catchError(() => of([]))
    )
  }
}
