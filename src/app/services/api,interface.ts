import { Observable } from "rxjs";
import { CurrentConditions } from "../interfaces/current-conditions";
import { HttpResponse } from "../interfaces/geoposition-search";
import { LocationHttpResponse } from "../interfaces/autocomplete";
import { SearchByLocationKey } from "../interfaces/search-by-location-key";

export interface IApiService {
    getGeopositionSearch(latitude: number, longitude: number): Observable<HttpResponse.GeopositionSearch>;
    getAutoComplete(query: string): Observable<LocationHttpResponse[]>;
    getSearchByLocationKey(key: string): Observable<SearchByLocationKey>;
    getCurrentConditions(key: string) : Observable<CurrentConditions>;
}