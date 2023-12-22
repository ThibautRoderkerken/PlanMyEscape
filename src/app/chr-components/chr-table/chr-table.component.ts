import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import {
  Component,
  Input,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';

export interface IColumn {
  display: string;
  chipsTarget?: string[];
  chipsDisplay?: string[];
  chipsCallback?: Function;
  properties?: string[];
  callback?: Function;
  date?: string;
}

export interface IAction {
  display: string;
  callback: Function;
  disabled?: boolean;
  disabledCallback?: Function;
  show?: boolean;
  showCallback?: Function;
  color: 'accent' | 'primary' | 'warn';
}

@Component({
  selector: 'app-chr-table, [app-chr-table]',
  templateUrl: './chr-table.component.html',
  styleUrls: ['./chr-table.component.scss'],
})
export class ChrTableComponent implements AfterViewInit {
  @Input() columns: IColumn[];
  @Input() data: any[] = [];
  @Input() actions: IAction[];

  @Input() isAsc: boolean = true;
  @Output() isAscChange: EventEmitter<boolean> = new EventEmitter();
  @Input() sortBy: string;
  @Output() sortByChange: EventEmitter<string> = new EventEmitter();

  constructor(private _date: DatePipe) {}

  ngAfterViewInit(): void {}

  emitIsAsc(isAsc: any) {
    this.isAscChange.emit(isAsc);
  }

  emitSortBy(sortBy: any) {
    this.sortByChange.emit(sortBy);
  }

  getProperty = (entry: any, properties?: any[]) => {
    if (!properties) return entry;
    let value = entry;
    for (const i of properties) {
      value = (value as any)?.[i];
    }
    return value;
  };

  getIsAsc = () => {
    return this.isAsc;
  };

  getSortBy = () => {
    return this.sortBy;
  };
}
