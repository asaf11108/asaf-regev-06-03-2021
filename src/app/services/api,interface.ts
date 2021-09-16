import { Observable } from "rxjs";
import { CurrentConditions } from "../interfaces/current-conditions";
import { HttpResponse } from "../interfaces/geoposition-search";
import { LocationHttpResponse } from "../interfaces/location";

export interface IApiService {
    getGeopositionSearch(latitude: number, longitude: number): Observable<HttpResponse.GeopositionSearch>;
    getLocations(query: string): Observable<LocationHttpResponse[]>;
    getCurrentConditions(key: string) : Observable<CurrentConditions>;
}