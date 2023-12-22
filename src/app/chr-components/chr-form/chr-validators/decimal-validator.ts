import { Directive, forwardRef, Input, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
@Directive({
  selector: '[app-decimal]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DecimalValidatorDirective,
      multi: true,
    },
  ],
})
export class DecimalValidatorDirective implements Validator {
  @Input() amount: number;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.amount ? decimal(this.amount)(control) : null;
  }
}

export function decimal(amount: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    let isTooLong = false;

    const str = `${value}`;
    isTooLong =
      str.indexOf(',') != -1
        ? (str.split(',')[1] ? str.split(',')[1].length : 0) > amount
        : str.indexOf('.') != -1
        ? (str.split('.')[1] ? str.split('.')[1].length : 0) > amount
        : false;

    return isTooLong
      ? ({
          decimal: true,
          max: amount,
        } as ValidationErrors)
      : null;
  };
}
