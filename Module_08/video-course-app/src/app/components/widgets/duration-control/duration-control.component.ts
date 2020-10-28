import { Component, OnInit, ChangeDetectorRef, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validator, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-duration-control',
  templateUrl: './duration-control.component.html',
  styleUrls: ['./duration-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationControlComponent),
      multi: true
    }
  ]
})
export class DurationControlComponent implements OnInit, ControlValueAccessor, Validator {

  durationInput = new FormControl('');

  constructor() {}

  ngOnInit(): void { }

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    // console.log('DurationControlComponent Inside writeValue', val);
    this.durationInput.setValue(val);
  }

  registerOnChange(fn: any): void {
    // console.log('on change');
    this.durationInput.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // console.log('on blur');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.durationInput.disable() : this.durationInput.enable();
  }

  validate(control: AbstractControl): ValidationErrors {
    this.durationInput.setValidators(control.validator);
    // console.log(this.durationInput.errors);
    return this.durationInput.valid ? null : this.durationInput.errors;
  }
  registerOnValidatorChange?(fn: () => void): void {
    // console.log('registerOnValidatorChange');
  }
}
