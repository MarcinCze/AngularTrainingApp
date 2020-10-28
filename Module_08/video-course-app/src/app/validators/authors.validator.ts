import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Author } from '../models/author';

export class AuthorsValidator {

  static atLeastOne(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return; }

    const value: Author[] = control.value;
    if (value.length >= 1) { return null; }

    return { notEvenOne: true };
  }

  static maxFive(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return; }

    const value: Author[] = control.value;
    if (value.length <= 5) { return null; }

    return { moreThanFive: true };
  }

}
