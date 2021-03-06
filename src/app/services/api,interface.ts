import { Observable } from "rxjs";
import { CurrentConditions } from "../model/current-conditions";
import { Forecast, ForecastHttpResponse } from "../model/forecast";
import { LocationHttpResponse } from "../model/location";

export interface IApiService {
    getLocations(query: string): Observable<LocationHttpResponse[]>;
    getCurrentConditions(key: string) : Observable<CurrentConditions[]>;
    getForecasts(key: string): Observable<ForecastHttpResponse[]>;
}