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
  selector: '[app-before-date]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: BeforeDateValidatorDirective,
      multi: true,
    },
  ],
})
export class BeforeDateValidatorDirective implements Validator {
  @Input() date: Date;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.date ? beforeDate(this.date)(control) : null;
  }
}

export function beforeDate(date: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const maxDate = moment(date);
    const inputDate = moment(value);

    return !(inputDate.isValid() && inputDate.isBefore(maxDate))
      ? ({
          beforedate: true,
          before: maxDate.toDate(),
          actual: value,
        } as ValidationErrors)
      : null;
  };
}
