import { untilDestroyed } from 'ngx-take-until-destroy';
import { ApiService } from './../../services/api.mock.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, concat, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators';
import { Location } from "../../model/location";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FavoriteLocation } from '../../store2/favorite-location/favorite-location';
import { FavoriteLocationService } from '../../store2/favorite-location/favorite-location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  form: FormGroup;

  filteredOptions$: Observable<Location[]>;
  favoriteLocation$: Observable<FavoriteLocation>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private favoriteLocationService: FavoriteLocationService,
  ) { }

  ngOnInit(): void {
    let activeFavoriteLocation;
    this.favoriteLocationService.selectActiveEntityFromCatch().pipe(untilDestroyed(this)).subscribe(entity => {
      activeFavoriteLocation = entity;
    });
    const selectedOption: Location = {
      key: activeFavoriteLocation?.id ?? '215854',
      localizedName: activeFavoriteLocation?.locationName ?? 'Tel Aviv'
    };

    this.favoriteLocation$ = this.favoriteLocationService.selectEntityFromCatch(selectedOption.key);
    this.isLoading$ = this.favoriteLocationService.loading$;
    this.error$ = this.favoriteLocationService.errors$;
    
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
    this.favoriteLocationService.getFavoriteData(selectedOption.key, selectedOption.localizedName);
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    const selectedOption = event.option.value;
    this.form.setValue({ ...selectedOption });
    this.favoriteLocationService.getFavoriteData(selectedOption.key, selectedOption.localizedName);
    this.favoriteLocation$ = this.favoriteLocationService.selectEntityFromCatch(selectedOption.key);
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
      this.favoriteLocationService.updateOneInCache({ id: this.form.get('key').value, isFavorite: false });
    } else {
      this.favoriteLocationService.updateOneInCache({ id: this.form.get('key').value, isFavorite: true });
    }
  }

  ngOnDestroy(): void {
  }
}
