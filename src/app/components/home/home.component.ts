import { FavoriteLocation } from './../../store/favorite-locations/state/favorite-location.model';
import { FavoriteLocationsStore } from './../../store/favorite-locations/state/favorite-locations.store';
import { FavoriteLocationsQuery } from './../../store/favorite-locations/state/favorite-locations.query';
import { FavoritesToggleDirective } from './../../directives/favorites-toggle.directive';
import { ForecastData } from './../forecast/forecast.data';
import { FavoriteLocationsService } from './../../store/favorite-locations/state/favorite-locations.service';
import { CurrentConditions } from './../../model/current-conditions';
import { ApiService } from './../../services/api.mock.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, concat, of, forkJoin } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Location } from "../../model/location";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { format } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedOption: Location;
  form: FormGroup;
  filteredOptions$: Observable<Location[]>;
  @ViewChild(FavoritesToggleDirective) directive: FavoritesToggleDirective;
  favoriteLocation$: Observable<FavoriteLocation>;
  isFavorite$: Observable<boolean>;

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
      Key: activeFavoriteLocation?.id || '215854',
      LocalizedName: activeFavoriteLocation?.title ||'Tel Aviv'
    };
    this.favoriteLocation$ = this.favoriteLocationsQuery.selectEntity(this.selectedOption.Key);
    this.form = this.formBuilder.group({
      Key: [this.selectedOption.Key],
      LocalizedName: [this.selectedOption.LocalizedName, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]]
    });
    this.filteredOptions$ = concat(
      of(this.selectedOption.LocalizedName),
      this.form.controls['LocalizedName'].valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(() => !this.form.controls['LocalizedName'].invalid)
      )
    ).pipe(
      switchMap(query => this.apiService.getLocations(query)),
      map(locations => locations.map(location => ({ Key: location.Key, LocalizedName: location.LocalizedName })))
    );
    this.favoriteLocationsService.getfavoriteData(this.selectedOption.Key, this.selectedOption.LocalizedName);
  }

  ngAfterViewInit(): void {
    // this.setToggle();
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    this.selectedOption = event.option.value;
    this.form.setValue({
      ...this.selectedOption
    });
    this.favoriteLocationsService.getfavoriteData(this.selectedOption.Key, this.selectedOption.LocalizedName);
    this.favoriteLocation$ = this.favoriteLocationsQuery.selectEntity(this.selectedOption.Key);
    // this.setToggle();
  }

  displayFn(location: Location | string): string {
    if (typeof location == 'object') {
      return location.LocalizedName;
    } else {
      return location;
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  addToFavorites(): void {
    this.favoriteLocationsStore.update(this.selectedOption.Key, entity => ({ ...entity, favorite: true}));
  }
  
  removeFromFavorites(): void {
    this.favoriteLocationsStore.update(this.selectedOption.Key, entity => ({ ...entity, favorite: false}));
  }

  setToggle(): void {
    const exist = this.favoriteLocationsQuery.hasEntity(this.selectedOption.Key);
    this.directive.changeToggle(exist);
  }
}
