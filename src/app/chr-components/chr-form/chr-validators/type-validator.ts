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
  selector: '[app-type]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TypeValidatorDirective,
      multi: true,
    },
  ],
})
export class TypeValidatorDirective implements Validator {
  @Input() type: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.type ? type(this.type)(control) : null;
  }
}

export function type(type: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isType = typeof value == type;

    return !isType
      ? ({
          type: true,
          requiredType: type,
          actualType: typeof value,
        } as ValidationErrors)
      : null;
  };
}
