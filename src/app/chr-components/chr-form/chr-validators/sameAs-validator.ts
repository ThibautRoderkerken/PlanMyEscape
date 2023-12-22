import { Directive, forwardRef, Input, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
@Directive({
  selector: '[app-sameAs]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameAsValidatorDirective,
      multi: true,
    },
  ],
})
export class SameAsValidatorDirective implements Validator {
  @Input() amount: AbstractControl;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.amount ? sameAs(this.amount)(control) : null;
  }
}

export function sameAs(target: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    let matches = false;

    matches = control.value == target.value;

    return !matches
      ? ({
          sameas: true,
        } as ValidationErrors)
      : null;
  };
}
