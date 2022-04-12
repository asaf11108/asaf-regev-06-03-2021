import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Directive, ElementRef, Inject, NgZone, Optional, Self } from '@angular/core';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { MatInput, MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';

@Directive({
  selector: `input[appInput], textarea[appInput], select[appNativeControl],
      input[appNativeControl], textarea[appNativeControl]`,
  exportAs: 'appInput',
  host: {
    'class': 'mat-input-element mat-form-field-autofill-control',
    '[class.mat-input-server]': '_isServer',
    '[attr.id]': 'id',
    '[attr.data-placeholder]': 'placeholder',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '[attr.readonly]': 'readonly && !_isNativeSelect || null',
    '[attr.aria-invalid]': '(empty && required) ? null : errorState',
    '[attr.aria-required]': 'required',
    
    '[autocomplete]': 'off'
  },
  providers: [{provide: MatFormFieldControl, useExisting: InputDirective}],
})
//@ts-ignore
export class InputDirective extends MatInput {

  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    protected _platform: Platform,
    @Optional() @Self() ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() @Inject(MAT_INPUT_VALUE_ACCESSOR) inputValueAccessor: any,
    private _autofillMonitor: AutofillMonitor,
    ngZone: NgZone,
    // TODO: Remove this once the legacy appearance has been removed. We only need
    // to inject the form-field for determining whether the placeholder has been promoted.
    @Optional() @Inject(MAT_FORM_FIELD) private _formField?: MatFormField) {
      super(
        _elementRef,
        _platform,
        ngControl,
        _parentForm,
        _parentFormGroup,
        _defaultErrorStateMatcher,
        inputValueAccessor,
        _autofillMonitor,
        ngZone
      )
    }

}
