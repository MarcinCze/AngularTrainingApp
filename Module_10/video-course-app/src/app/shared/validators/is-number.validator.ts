import { AbstractControl, ValidationErrors } from '@angular/forms';

export class IsNumberValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    // console.log('IsNumberValidator', control.value);

    if (!control.value) { return; }

    if (isNaN(control.value)) {
      return { notNumber: true };
    }

    return null;
  }
}
