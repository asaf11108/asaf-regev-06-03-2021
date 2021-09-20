import { ApiService as ApiMockService } from './api.mock.service';
import { IApiService } from './api,interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutocompleteOption } from "../interfaces/api/autocomplete";
import { CurrentConditions } from "../interfaces/api/current-conditions";
import { catchError } from 'rxjs/operators';
import { GeopositionSearch } from '../interfaces/api/geoposition-search';
import { SearchByLocationKey } from '../interfaces/api/search-by-location-key';
import { skipLoader } from './loader.interceptor';


@Injectable()
export class ApiService implements IApiService {

  readonly apiMockService: IApiService;

  constructor(private http: HttpClient) {
    this.apiMockService = new ApiMockService();
  }

  getAutoComplete(query: string): Observable<AutocompleteOption[]> {
    return this.http.get<AutocompleteOption[]>(
      `locations/v1/cities/autocomplete`, {
        params: {
          q: encodeURIComponent(query)
        },
        context: skipLoader()
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

  getGeopositionSearch(latitude: number, longitude: number): Observable<GeopositionSearch> {
    return this.http.get<GeopositionSearch>(`locations/v1/cities/geoposition/search`, {
      params: {
        q: [latitude, longitude].join(',')
      }
    }).pipe(
      catchError(() => {
        return this.apiMockService.getGeopositionSearch(latitude, longitude);
      })
    )
  }
  
  getSearchByLocationKey(key: string): Observable<SearchByLocationKey> {
    return this.http.get<SearchByLocationKey>(`locations/v1/${key}`).pipe(
      catchError(() => {
        return this.apiMockService.getSearchByLocationKey(key);
      })
    )
  }
}
