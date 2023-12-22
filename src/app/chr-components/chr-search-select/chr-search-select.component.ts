import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import {
  Observable,
  startWith,
  map,
  of,
  combineLatest,
  combineLatestAll,
} from 'rxjs';
import { ISearchFilter } from '../chr-form/chr-form.component';

@Component({
  selector: 'app-chr-search-select',
  templateUrl: './chr-search-select.component.html',
  styleUrls: ['./chr-search-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ChrSearchSelectComponent,
    },
  ],
})
export class ChrSearchSelectComponent implements ControlValueAccessor {
  public predicate: boolean = true;

  public searchSelect: FormControl = new FormControl();
  public filteredModelOptions: Observable<any>;

  public onTouched: any = () => {};

  @Input() placeholder: string;
  @Input() data: any[] = [];
  @Input() display: Function;
  @Input() disabled: boolean = false;
  @Input() model: any | null = null;
  @Output() modelChange: EventEmitter<any> = new EventEmitter();
  @Output() keyup: EventEmitter<KeyboardEvent> =
    new EventEmitter<KeyboardEvent>();

  @Input() filters?: ISearchFilter[];
  public filterIndex: number = 0;

  ngOnInit() {
    this.registerFilters();
    this.registerAutoComplete();
  }

  getModelDisplay(model: any) {
    return this.display?.(model);
  }

  emit(event: any) {
    this.modelChange.emit(event);
  }

  writeValue(obj: any): void {
    this.searchSelect.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.searchSelect.valueChanges.subscribe((value) => {
      this.checkNull(value);
      fn(value);
    });
  }

  checkNull(value: any | null) {
    if (typeof value == 'string')
      if (value == '' || value.trim() == '') this.setNull;
    if (value == null || value == '') {
      this.setNull();
    }
  }

  setNull() {
    this.emit(null);
    this.model = null;
  }

  registerOnTouched(fn: any): void {
    this.searchSelect.markAsTouched = fn;
  }

  registerFilters = () => {
    this.filteredModelOptions = this.searchSelect.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterModel(value! || -1)),
      map((values) => {
        return this.filters && this.filters[this.filterIndex].callback
          ? values.filter((r) => this.filters![this.filterIndex].callback!(r))
          : values;
      })
    );
  };

  registerAutoComplete = () => {
    //If there is only one value left,
    this.filteredModelOptions.subscribe((values) => {
      if (values.length == 1) {
        this.emit(values[0]);
      }
    });
  };

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    isDisabled ? this.searchSelect.disable() : this.searchSelect.enable();
  }

  increment = () => {
    this.writeValue('');
    const modulo = this.filters ? this.filters.length : 1;
    this.filterIndex = (this.filterIndex + 1) % modulo;
  };

  getValue = () => {
    return this.searchSelect.value;
  };

  void = () => {};

  private _filterModel(value: number | string): any[] {
    return typeof value == 'string'
      ? this._doFilterModelString(`${value}`)
      : this._doFilterModelInt(value);
  }

  private _doFilterModelInt = (id: number) => {
    const tmp = this.data.find((r) => r.id == id);
    return tmp ? tmp : [];
  };

  private _doFilterModelString(input: string) {
    return this.data.filter((r) => this._filterValues(r, input));
  }

  private _filterValues(value: any, input: string) {
    return `${this.getModelDisplay(value)}`
      .toLowerCase()
      .includes(input.toLowerCase());
  }
}
