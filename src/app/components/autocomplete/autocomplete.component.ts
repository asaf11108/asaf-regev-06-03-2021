import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concat, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, map, tap } from 'rxjs/operators';
import { ApiService } from './../../services/api.mock.service';
import { Location } from "../../interfaces/location";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit {
  form: FormGroup;

  filteredOptions$: Observable<Location[]>;

  @Input() selectedOption: Location;
  @Output() select = new EventEmitter<Location>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      key: [this.selectedOption.key],
      localizedName: [this.selectedOption.localizedName, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]]
    });

    this.filteredOptions$ = concat(
      of(this.selectedOption.localizedName),
      this.form.get('localizedName').valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(() => !this.form.get('localizedName').invalid)
      )
    ).pipe(
      switchMap(query => this.apiService.getLocations(query)),
      map(locations => locations.map(location => ({ key: location.Key, localizedName: location.LocalizedName })))
    );
  }

  displayFn(location: Location | string): string {
    if (typeof location === 'object') {
      return location.localizedName;
    } else {
      return location;
    }
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    const selectedOption = event.option.value;
    this.form.setValue(selectedOption);
    this.select.emit(selectedOption);
  }

}
