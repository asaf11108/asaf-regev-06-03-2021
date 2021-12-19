import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
} from 'rxjs/operators';
import { ApiService } from '../../services/api-mock.service';
import { Location } from '../../state/weather-locations/weather-location.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-autocomplete'
  }
})
export class AutocompleteComponent implements OnInit {
  form: FormGroup = new FormGroup({
    query: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/),
    ]),
  });
  controls = {
    query: this.form.get('query'),
  };

  filteredOptions$: Observable<Location[]>;

  @Input() set selectedOption(selectedOption: Location) {
    selectedOption && this.controls.query.setValue(selectedOption.localizedName);
  }
  @Output() select = new EventEmitter<Location>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.filteredOptions$ = this.controls.query.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(() => this.controls.query.valid),
      switchMap((query) => this.apiService.getAutoComplete(query)),
      map((locations) =>
        locations.map((location) => ({
          key: location.Key,
          localizedName: location.LocalizedName,
        }))
      )
    );
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    const selectedOption: Location = event.option.value;
    this.controls.query.setValue(selectedOption.localizedName);
    this.select.emit(selectedOption);
  }
}
