import {
  Component,
  Input,
  Output,
  EventEmitter,
  Directive,
} from '@angular/core';
/**
 * This should only be used as a directive
 */
@Component({
  selector: 'app-chr-table-header-cell, [app-chr-table-header-cell]',
  templateUrl: './chr-table-header-cell.component.html',
  styleUrls: ['./chr-table-header-cell.component.scss'],
})
export class ChrTableHeaderCellComponent {
  @Input() display: string;
  @Input() column: string;
  @Input() isAsc: boolean = true;
  @Output() isAscChange: EventEmitter<boolean> = new EventEmitter();
  @Input() sortBy: string;
  @Output() sortByChange: EventEmitter<string> = new EventEmitter();

  orderBy = (column: string) => {
    if (!this.sortBy) this.sortBy = column;

    if (this.sortBy == column) {
      this.isAsc = !this.isAsc;
      this.sortBy = column;
      this.isAscChange.emit(this.isAsc);
      this.sortByChange.emit(this.sortBy);
    } else {
      this.isAsc = true;
      this.sortBy = column;
      this.isAscChange.emit(this.isAsc);
      this.sortByChange.emit(this.sortBy);
    }
  };
}
