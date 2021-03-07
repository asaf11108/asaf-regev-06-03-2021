import { Observable } from "rxjs";
import { Location } from "../model/location";

export interface IapiService {
    getLocations(query: string): Observable<Partial<Location>[]>;
}