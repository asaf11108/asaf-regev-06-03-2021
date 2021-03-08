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
  currentConditions: CurrentConditions;
  forecasts: ForecastData[];
  @ViewChild(FavoritesToggleDirective) directive: FavoritesToggleDirective;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private favoriteLocationsService: FavoriteLocationsService,
    private favoriteLocationsQuery: FavoriteLocationsQuery,
    ) { }

  ngOnInit(): void {
    const activeFavoriteLocation = this.favoriteLocationsQuery.getActive() as FavoriteLocation;
    this.selectedOption = {
      Key: activeFavoriteLocation?.id || '215854',
      LocalizedName: activeFavoriteLocation?.title ||'Tel Aviv'
    };
    this.form = this.formBuilder.group({
      Key: [this.selectedOption.Key],
      LocalizedName: [this.selectedOption.LocalizedName, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]]
    })
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
    this._setLocationWeather(this.selectedOption.Key);
  }

  ngAfterViewInit(): void {
    this.setToggle();
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    this.selectedOption = event.option.value;
    this.form.setValue({
      ...this.selectedOption
    });
    this._setLocationWeather(event.option.value.Key);
    this.setToggle();
  }

  displayFn(location: Location | string): string {
    if (typeof location == 'object') {
      return location.LocalizedName;
    } else {
      return location;
    }
  }

  private _setLocationWeather(key: string): void {
    forkJoin([
      this.apiService.getCurrentConditions(key),
      this.apiService.getForecasts(key)
    ]).pipe(untilDestroyed(this)).subscribe(res => {
      this.currentConditions = res[0][0];
      this.forecasts = res[1].map(forecast => ({ title: format(new Date(forecast.Date), 'EEE'), temperature: forecast.Temperature.Minimum.Value }));
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  addToFavorites(): void {
    this.favoriteLocationsService.add({
      id: this.selectedOption.Key,
      title: this.selectedOption.LocalizedName,
      temperature: this.currentConditions.Temperature.Metric.Value,
      icon: this.currentConditions.WeatherIcon.toString()
    });
  }

  removeFromFavorites(): void {
    this.favoriteLocationsService.remove(this.selectedOption.Key);
  }

  setToggle(): void {
    const exist = this.favoriteLocationsQuery.hasEntity(this.selectedOption.Key);
    this.directive.changeToggle(exist);
  }
}
