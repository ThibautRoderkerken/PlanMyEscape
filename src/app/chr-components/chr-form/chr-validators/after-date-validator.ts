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
  selector: '[app-after-date]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AfterDateValidatorDirective,
      multi: true,
    },
  ],
})
export class AfterDateValidatorDirective implements Validator {
  @Input() date: Date;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.date ? afterDate(this.date)(control) : null;
  }
}

export function afterDate(date: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const maxDate = moment(date);
    const inputDate = moment(value);

    return !(inputDate.isValid() && inputDate.isAfter(maxDate))
      ? ({
          afterdate: true,
          after: maxDate.toDate(),
          actual: value,
        } as ValidationErrors)
      : null;
  };
}
