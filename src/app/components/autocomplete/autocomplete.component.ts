import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
  tap,
} from 'rxjs/operators';
import { ApiService } from './../../services/api.mock.service';
import { Location } from '../../state/weather-locations/weather-location.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { OnChange } from 'property-watch-decorator';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  form: FormGroup = new FormGroup({
    key: new FormControl(''),
    localizedName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/),
    ]),
  });
  controls = {
    key: this.form.get('key'),
    localizedName: this.form.get('localizedName'),
  };

  filteredOptions$: Observable<Location[]>;

  @OnChange<Location>(function (selectedOption) {
    if (selectedOption) {
      this.form.setValue(selectedOption);
    }
  })
  @Input()
  selectedOption: Location;
  @Output() select = new EventEmitter<Location>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.filteredOptions$ = this.controls.localizedName.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(() => this.controls.localizedName.valid),
      switchMap((query) => this.apiService.getLocations(query)),
      map((locations) =>
        locations.map((location) => ({
          key: location.Key,
          localizedName: location.LocalizedName,
        }))
      )
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