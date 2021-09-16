import { ApiService as ApiMockService } from './api.mock.service';
import { IApiService } from './api,interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationHttpResponse } from "../interfaces/autocomplete";
import { CurrentConditions } from "../interfaces/current-conditions";
import { catchError } from 'rxjs/operators';
import { HttpResponse } from '../interfaces/geoposition-search';
import { SearchByLocationKey } from '../interfaces/search-by-location-key';


@Injectable()
export class ApiService implements IApiService {

  readonly apiMockService: IApiService;

  constructor(private http: HttpClient) {
    this.apiMockService = new ApiMockService();
  }

  getAutoComplete(query: string): Observable<LocationHttpResponse[]> {
    return this.http.get<LocationHttpResponse[]>(
      `locations/v1/cities/autocomplete`, {
        params: {
          q: encodeURIComponent(query)
        }
      }).pipe(
      catchError(() => {
        return this.apiMockService.getAutoComplete(query);
      })
    )
  }

  getCurrentConditions(key: string): Observable<CurrentConditions> {
    return this.http.get<CurrentConditions>(`currentconditions/v1/${key}`).pipe(
      catchError(() => {
        return this.apiMockService.getCurrentConditions(key);
      })
    )
  }

  getGeopositionSearch(latitude: number, longitude: number): Observable<HttpResponse.GeopositionSearch> {
    return this.http.get<HttpResponse.GeopositionSearch>(`locations/v1/cities/geoposition/search`, {
      params: {
        q: encodeURIComponent([latitude, longitude].join(','))
      }
    }).pipe(
      catchError(() => {
        return this.apiMockService.getGeopositionSearch(latitude, longitude);
      })
    )
  }
  
  getSearchByLocationKey(key: string): Observable<SearchByLocationKey> {
    return this.http.get<HttpResponse.GeopositionSearch>(`locations/v1/${key}`).pipe(
      catchError(() => {
        return this.apiMockService.getSearchByLocationKey(key);
      })
    )
  }
}
