import { FavoriteLocation } from './../../store/favorite-locations/state/favorite-location.model';
import { FavoriteLocationsStore } from './../../store/favorite-locations/state/favorite-locations.store';
import { FavoriteLocationsQuery } from './../../store/favorite-locations/state/favorite-locations.query';
import { FavoriteLocationsService } from './../../store/favorite-locations/state/favorite-locations.service';
import { ApiService } from './../../services/api.mock.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, concat, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators';
import { Location } from "../../model/location";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  filteredOptions$: Observable<Location[]>;
  favoriteLocation$: Observable<FavoriteLocation>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private favoriteLocationsService: FavoriteLocationsService,
    private favoriteLocationsQuery: FavoriteLocationsQuery,
    private favoriteLocationsStore: FavoriteLocationsStore
  ) { }

  ngOnInit(): void {
    const activeFavoriteLocation = this.favoriteLocationsQuery.getActive() as FavoriteLocation;
    const selectedOption: Location = {
      key: activeFavoriteLocation?.id ?? '215854',
      localizedName: activeFavoriteLocation?.locationName ?? 'Tel Aviv'
    };

    this.favoriteLocation$ = this.favoriteLocationsQuery.selectEntity(selectedOption.key);
    this.isLoading$ = this.favoriteLocationsQuery.selectLoading();
    this.error$ = this.favoriteLocationsQuery.selectError();
    
    this.form = this.formBuilder.group({
      key: [selectedOption.key],
      localizedName: [selectedOption.localizedName, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]]
    });
    this.filteredOptions$ = concat(
      of(selectedOption.localizedName),
      this.form.get('localizedName').valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(() => !this.form.get('localizedName').invalid)
      )
    ).pipe(
      switchMap(query => this.apiService.getLocations(query)),
      map(locations => locations.map(location => ({ key: location.Key, localizedName: location.LocalizedName })))
    );
    this.favoriteLocationsService.getFavoriteData(selectedOption.key, selectedOption.localizedName);
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    const selectedOption = event.option.value;
    this.form.setValue({ ...selectedOption });
    this.favoriteLocationsService.getFavoriteData(selectedOption.key, selectedOption.localizedName);
    this.favoriteLocation$ = this.favoriteLocationsQuery.selectEntity(selectedOption.key);
  }

  displayFn(location: Location | string): string {
    if (typeof location === 'object') {
      return location.localizedName;
    } else {
      return location;
    }
  }

  favoriteClick(favorite: boolean): void {
    if (favorite) {
      this.favoriteLocationsStore.update(this.form.get('key').value, entity => ({ ...entity, isFavorite: false }));
    } else {
      this.favoriteLocationsStore.update(this.form.get('key').value, entity => ({ ...entity, isFavorite: true }));
    }
  }

}
