import { FavoriteLocation } from './../../store/favorite-locations/state/favorite-location.model';
import { FavoriteLocationsStore } from './../../store/favorite-locations/state/favorite-locations.store';
import { FavoriteLocationsQuery } from './../../store/favorite-locations/state/favorite-locations.query';
import { FavoriteLocationsService } from './../../store/favorite-locations/state/favorite-locations.service';
import { ApiService } from './../../services/api.mock.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, concat, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Location } from "../../model/location";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedOption: Location;
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
    this.selectedOption = {
      key: activeFavoriteLocation?.id ?? '215854',
      localizedName: activeFavoriteLocation?.title ?? 'Tel Aviv'
    };
    this.favoriteLocation$ = this.favoriteLocationsQuery.selectEntity(this.selectedOption.key);
    this.isLoading$ = this.favoriteLocationsQuery.selectLoading();
    this.error$ = this.favoriteLocationsQuery.selectError();
    this.form = this.formBuilder.group({
      Key: [this.selectedOption.key],
      LocalizedName: [this.selectedOption.localizedName, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]]
    });
    this.filteredOptions$ = concat(
      of(this.selectedOption.localizedName),
      this.form.controls['LocalizedName'].valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(() => !this.form.controls['LocalizedName'].invalid)
      )
    ).pipe(
      switchMap(query => this.apiService.getLocations(query)),
      map(locations => locations.map(location => ({ key: location.Key, localizedName: location.LocalizedName })))
    );
    this.favoriteLocationsService.getfavoriteData(this.selectedOption.key, this.selectedOption.localizedName);
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    this.selectedOption = event.option.value;
    this.form.setValue({
      ...this.selectedOption
    });
    this.favoriteLocationsService.getfavoriteData(this.selectedOption.key, this.selectedOption.localizedName);
    this.favoriteLocation$ = this.favoriteLocationsQuery.selectEntity(this.selectedOption.key);
  }

  displayFn(location: Location | string): string {
    if (typeof location === 'object') {
      return location.localizedName;
    } else {
      return location;
    }
  }

  addToFavorites(): void {
    this.favoriteLocationsStore.update(this.selectedOption.key, entity => ({ ...entity, favorite: true }));
  }

  removeFromFavorites(): void {
    this.favoriteLocationsStore.update(this.selectedOption.key, entity => ({ ...entity, favorite: false }));
  }

}
