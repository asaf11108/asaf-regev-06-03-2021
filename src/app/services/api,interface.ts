import { Observable } from "rxjs";
import { CurrentConditions } from "../interfaces/api/current-conditions";
import { GeopositionSearch } from "../interfaces/api/geoposition-search";
import { AutocompleteOption } from "../interfaces/api/autocomplete";
import { SearchByLocationKey } from "../interfaces/api/search-by-location-key";

export interface IApiService {
    getGeopositionSearch(latitude: number, longitude: number): Observable<GeopositionSearch>;
    getAutoComplete(query: string): Observable<AutocompleteOption[]>;
    getSearchByLocationKey(key: string): Observable<SearchByLocationKey>;
    getCurrentConditions(key: string) : Observable<CurrentConditions>;
}