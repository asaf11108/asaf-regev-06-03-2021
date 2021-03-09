import { Observable } from "rxjs";
import { CurrentConditions } from "../model/current-conditions";
import { Forecast, ForecastHttpResponse } from "../model/forecast";
import { Location } from "../model/location";

export const API_KEY = 'Lx1f7HdveztpydjGREeVy3VPdhwWK4iK';

export interface IapiService {
    getLocations(query: string): Observable<Location[]>;
    getCurrentConditions(key: string) : Observable<CurrentConditions[]>;
    getForecasts(key: string): Observable<ForecastHttpResponse[]>;
}