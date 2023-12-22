import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-chr-checkbox',
  templateUrl: './chr-checkbox.component.html',
  styleUrls: ['./chr-checkbox.component.scss']
})
export class ChrCheckboxComponent {

  public checked:boolean = false

  @Input() type:'info'|'success' = 'info'

  @Input() disabled:boolean = false

  @Output() change: EventEmitter<{checked:boolean}> = new EventEmitter<{checked:boolean}>();

  check(end:boolean){
    if(this.disabled)
      return
    if(end){
      this.checked = true;
      this.change.emit({checked:true})
    } else {
      this.checked = false;
      this.change.emit({checked:false})
    }
  }
}
