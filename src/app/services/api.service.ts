import { ApiService as ApiMockService } from './api.mock.service';
import { IApiService } from './api,interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationHttpResponse } from "../interfaces/location";
import { CurrentConditions } from "../interfaces/current-conditions";
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '../interfaces/geoposition-search';


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
  ) {
    this.apiMockService = new ApiMockService();
  }

  getLocations(query: string): Observable<LocationHttpResponse[]> {
    return this.http.get<LocationHttpResponse[]>(
      `${this.HTTP_PREFIX}${this.ENDPOINT}locations/v1/cities/autocomplete`, {
        params: {
          apikey: this.API_KEY,
          q: encodeURIComponent(query)
        }
      }).pipe(
      catchError(() => {
        this.handleError();
        return this.apiMockService.getLocations(query);
      })
    )
  }

  getCurrentConditions(key: string): Observable<CurrentConditions> {
    return this.http.get<CurrentConditions>(
      `${this.HTTP_PREFIX}${this.ENDPOINT}currentconditions/v1/${key}`, {
        params: {
          apikey: this.API_KEY
        }
      }).pipe(
      catchError(() => {
        this.handleError();
        return this.apiMockService.getCurrentConditions(key);
      })
    )
  }

  getGeopositionSearch(latitude: number, longitude: number): Observable<HttpResponse.GeopositionSearch> {
    return this.http.get<HttpResponse.GeopositionSearch>(`${this.HTTP_PREFIX}${this.ENDPOINT}/locations/v1/cities/geoposition/search`, {
      params: {
        apikey: this.API_KEY,
        q: encodeURIComponent([latitude, longitude].join(','))
      }
    }).pipe(
      catchError(() => {
        this.handleError();
        return this.apiMockService.getGeopositionSearch(latitude, longitude);
      })
    )
  }

  handleError(): void {
    this._snackBar.open(this.BAD_REQUEST, '', { duration: 2000 });
    // this.favoriteLocationsStore.setError(this.BAD_REQUEST);
  }
}
