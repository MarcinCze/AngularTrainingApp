import { Component, OnInit, forwardRef } from '@angular/core';
import {
  FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl,
  ValidationErrors, NG_VALIDATORS
} from '@angular/forms';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true
    }
  ]
})
export class DateControlComponent implements OnInit, ControlValueAccessor, Validator {

  public dateInput = new FormControl('');

  constructor() { }

  ngOnInit(): void { }

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    // console.log('DateControlComponent Inside writeValue', val);
    this.dateInput.setValue(val);
  }

  registerOnChange(fn: any): void {
    // console.log('on change');
    this.dateInput.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // console.log('on blur');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.dateInput.disable() : this.dateInput.enable();
  }

  validate(control: AbstractControl): ValidationErrors {
    this.dateInput.setValidators(control.validator);
    // console.log(this.dateInput.errors);
    return this.dateInput.valid ? null : this.dateInput.errors;
  }
  registerOnValidatorChange?(fn: () => void): void {
    // console.log('registerOnValidatorChange');
  }
}
