import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Self,
  Optional,
  HostBinding,
  DoCheck,
  OnDestroy,
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
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
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-autocomplete',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  },
  providers: [{ provide: MatFormFieldControl, useExisting: AutocompleteComponent }]
})
export class AutocompleteComponent implements MatFormFieldControl<string>, ControlValueAccessor, OnInit, DoCheck, OnDestroy {
  constructor(
    private apiService: ApiService,
    private controlContainer: ControlContainer,
    @Optional() @Self() public ngControl: NgControl,
    private focusMonitor: FocusMonitor,
  ) {
    this.ngControl && (this.ngControl.valueAccessor = this);
  }

  filteredOptions$: Observable<Location[]>;

  @Input() set selectedOption(selectedOption: Location) {
    // selectedOption && this.controls.query.setValue(selectedOption.localizedName);
  }
  @Output() select = new EventEmitter<Location>();

  static nextId = 0;
  @ViewChild(MatInput, { read: ElementRef, static: true }) inputEl: ElementRef;
  @Input() set formControlName(formControlName: string) {
    this.control = this.controlContainer.control.get(formControlName);
  }
  @Input() control: AbstractControl;

  @Output() input = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder() {
    return this._placeholder;
  }
  private _placeholder: string;
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  public _disabled = false;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  public _required = false;


  value = '';
  stateChanges = new Subject<void>();
  @HostBinding() id = `sh-textarea-id-${AutocompleteComponent.nextId++}`;
  focused: boolean;
  get empty() {
    return !this.value.trim();
  }
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  errorState = false;
  controlType = 'app-autocomplete';
  autofilled?: boolean;
  userAriaDescribedBy?: string;
  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    this.focusMonitor.focusVia(this.inputEl, 'program');
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onChanged: (value: string) => void;
  onTouched: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.inputEl);
    this.stateChanges.complete();
  }

  ngOnInit(): void {
    // this.filteredOptions$ = this.controls.query.valueChanges.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   filter(() => this.controls.query.valid),
    //   switchMap((query) => this.apiService.getAutoComplete(query)),
    //   map((locations) =>
    //     locations.map((location) => ({
    //       key: location.Key,
    //       localizedName: location.LocalizedName,
    //     }))
    //   )
    // );
  }

  onInput(value: string): void {
    if (this.disabled) {
      return;
    }
    this.onChanged(value);
    this.onTouched();
    this.input.emit(value);
  }

  onBlur(): void {
    this.onTouched();
    this.blur.emit();
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    const selectedOption: Location = event.option.value;
    this.select.emit(selectedOption);
  }
}
