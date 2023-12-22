import { Directive, forwardRef, Input, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
@Directive({
  selector: '[app-max-date]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MaxDateValidatorDirective,
      multi: true,
    },
  ],
})
export class MaxDateValidatorDirective implements Validator {
  @Input() date: Date;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.date ? maxDate(this.date)(control) : null;
  }
}

export function maxDate(date: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const maxDate = moment(date);
    const inputDate = moment(value);

    return !(inputDate.isValid() && inputDate.isBefore(maxDate))
      ? ({
          maxdate: true,
          max: maxDate.toDate(),
          actual: value,
        } as ValidationErrors)
      : null;
  };
}
