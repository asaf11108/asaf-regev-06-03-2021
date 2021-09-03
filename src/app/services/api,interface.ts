import { Observable } from "rxjs";
import { CurrentConditions } from "../interfaces/current-conditions";
import { ForecastHttpResponse } from "../interfaces/forecast";
import { LocationHttpResponse } from "../interfaces/location";

export interface IApiService {
    getLocations(query: string): Observable<LocationHttpResponse[]>;
    getCurrentConditions(key: string) : Observable<CurrentConditions[]>;
    getForecasts(key: string): Observable<ForecastHttpResponse[]>;
}