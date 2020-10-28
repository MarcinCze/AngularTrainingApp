import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomDateValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    // console.log('CustomDateValidator', control.value);

    if (!control.value) { return; }

    const value: string = control.value;

    // Length checking
    if (value.length > 10) {
      return { wrongDateFormat: true };
    }
    // console.log('CustomDateValidator -- Done length checking');

    // Format checking
    const regEx = new RegExp('[0-9]{2}\/[0-9]{2}\/[0-9]{4}');
    if (!regEx.test(control.value)) {
      return { wrongDateFormat: true };
    }
    // console.log('CustomDateValidator -- Done format checking');

    // Date correctness checking
    try {
      const day = value.substr(0, 2);
      const month = value.substr(3, 2);
      const year = value.substr(6, 4);
      const testDate = new Date(`${year}-${month}-${day}`);

      if (!(testDate.getDate() === +day && testDate.getMonth() + 1 === +month)) {
        throw new Error(`Date ${value} is incorrect`);
      }
    } catch (error) {
      console.error(error);
      return { wrongDateFormat: true };
    }
    // console.log('CustomDateValidator -- Done date correctness checking');

    return null;
  }
}
