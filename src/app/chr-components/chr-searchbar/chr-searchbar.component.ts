import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chr-searchbar',
  templateUrl: './chr-searchbar.component.html',
  styleUrls: ['./chr-searchbar.component.scss'],
})
export class ChrSearchbarComponent {
  @Input() model: string | null;
  @Output() modelChange: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string | null;
  @Input() label: string | null;
  public searchBy = new FormControl<string>('');

  constructor() {
    this.searchBy.valueChanges.subscribe((value) => this.emit(value));
  }

  emit(event: any) {
    this.modelChange.emit(event);
  }
}
