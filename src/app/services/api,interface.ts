import { Observable } from "rxjs";
import { CurrentConditions } from "../model/current-conditions";
import { Forecast } from "../model/forecast";
import { Location } from "../model/location";

export const API_KEY = 'gRf4KNnswLuVm8mG3puAI1GUOGeJTu1v';

export interface IapiService {
    getLocations(query: string): Observable<Location[]>;
    getCurrentConditions(key: string) : Observable<CurrentConditions[]>;
    getForecasts(key: string): Observable<Forecast[]>;
}