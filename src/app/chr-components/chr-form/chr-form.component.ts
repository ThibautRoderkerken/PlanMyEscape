import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { type } from './chr-validators/type-validator';
import { ValidatorFn } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { decimal } from './chr-validators/decimal-validator';
import { maxDate } from './chr-validators/max-date-validator';
import { sameAs } from './chr-validators/sameAs-validator';
import { beforeDate } from './chr-validators/before-date-validator';
import { afterDate } from './chr-validators/after-date-validator';
import { DatePipe } from '@angular/common';

export interface ISearchFilter {
  display: string;
  callback?: Function;
  tooltip?: string;
}

export interface IControlValidation {
  rule: string;
  value?: any;
  display?: string;
}

export interface IControl {
  label?: string;
  name: string;
  span?: string;
  placeholder?: any;
  width?: 'col' | 'row';
  type:
    | 'text'
    | 'password'
    | 'textArea'
    | 'number'
    | 'date'
    | 'datetime'
    | 'searchSelect'
    | 'select';
  value?: any;
  data?: any[];
  icon?: string;
  iconCallback?: Function;
  iconCallbackDisabled?: boolean;
  iconTooltip?: string;
  fn?: Function;
  filters?: ISearchFilter[];
  validations?: IControlValidation[];
}

export interface IFormSection {
  title?: string;
  controls: IControl[];
}
@Component({
  selector: 'app-chr-form',
  templateUrl: './chr-form.component.html',
  styleUrls: ['./chr-form.component.scss'],
})
export class ChrFormComponent {
  @Input() sections: IFormSection[];
  @Input() valid: boolean = false;
  @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() disabled: boolean = false;

  @Output() valuesChange: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;
  constructor(private builder: FormBuilder, private datePipe: DatePipe) {
    this.form = builder.group({});
  }

  ngOnInit(): void {
    this._initValidators();
    this.form.valueChanges.subscribe((res) => {
      this.valid = this.form.valid;
      this.validChange.emit(this.form.valid);
      this.valuesChange.emit(res);
    });
  }

  value = (input?: string) => {
    if (input) return this.form.controls[input]?.value;
    return this.form.value;
  };

  setValue = (input: string, value: any) => {
    if (input) this.form.controls[input]?.setValue(value);
  };

  isValid = (input?: string) => {
    if (input) return this.form.controls[input]?.valid;
    return this.valid;
  };

  isControlRequired = (control: IControl) => {
    return control.validations?.find((v) => v.rule.toLowerCase() == 'required');
  };

  patchValue = (key: string, value: any) => {
    this.form.patchValue({ [key]: value });
  };

  reset = () => {
    this.form.reset();
  };

  private _initValidators() {
    for (const section of this.sections) {
      for (const input of section.controls) {
        if (input.type == 'searchSelect' && !input.fn)
          throw new Error(
            "An input of type 'searchSelect' needs a display function !"
          );
        const control = new FormControl(
          input.value,
          this._getValidators(input.validations)
        );
        this.form.addControl(input.name, control);
      }
    }
  }

  private _getValidators = (validations?: IControlValidation[]) => {
    const validators: ValidatorFn[] = [];

    if (!validations) return validators;
    //Switch case breaks the mobile app so we'll do if statements
    for (const validation of validations) {
      const rule = validation.rule.toLocaleLowerCase();
      if (rule == 'min') {
        validation.display = 'Cette valeur est trop petite !';
        validators.push(Validators.min(validation.value));
      }
      if (rule == 'max') {
        validation.display = 'Cette valeur est trop grande !';
        validators.push(Validators.max(validation.value));
      }
      if (rule == 'required') {
        validation.display = 'Ce champs est requis !';
        validators.push(Validators.required);
      }
      if (rule == 'email') {
        validation.display = "Cette adresse email n'est pas valide !";
        validators.push(Validators.email);
      }
      if (rule == 'minlength') {
        validation.display = 'Cette valeur est trop petite !';
        validators.push(Validators.minLength(validation.value));
      }
      if (rule == 'maxlength') {
        validation.display = 'Cette valeur est trop grande !';
        validators.push(Validators.maxLength(validation.value));
      }
      if (rule == 'type') {
        validation.display = "Cette valeur n'est pas valide !";
        validators.push(type(validation.value));
      }
      if (rule == 'decimal') {
        validation.display = `Le nombre de décimal n'est pas valide (max: ${validation.value}) !`;
        validators.push(decimal(validation.value));
      }
      if (rule == 'maxdate') {
        validation.display = `Cette date est trop grande ! (max: ${validation.value}) !`;
        validators.push(maxDate(validation.value));
      }
      if (rule == 'beforedate') {
        validation.display = `Cette date est trop grande ! (max: ${this.datePipe.transform(validation.value, 'dd/MM/yyyy - H:mm')}) !`;
        validators.push(beforeDate(validation.value));
      }
      if (rule == 'afterdate') {
        validation.display = `Cette date est trop petite ! (min: ${this.datePipe.transform(validation.value, 'dd/MM/yyyy - H:mm')}) !`;
        validators.push(afterDate(validation.value));
      }
      if(rule == 'sameas') {
        validation.display = `Les mot de passes ne correspondent pas !`
        validators.push(sameAs(this.form.get(validation.value)!))
      }
    }
    return validators;
  };
}
