import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chr-button',
  templateUrl: './chr-button.component.html',
  styleUrls: ['./chr-button.component.scss'],
})
export class ChrButtonComponent {
  @Input() display: string = '';
  @Input() icon: string = '';
  @Input() click?: Function;
  @Input() color: 'primary' | 'accent' | 'warn' | 'none' = 'none';
  @Input() predicate?: boolean = true;
  @Input() type: 'table' | 'full' | 'fixed' | 'none' = 'none';
  @Input() href?: string;
  @Input() target: '_blank' | '_parent' | '_self' | '_top';
  @Input() disabled: boolean = false;
  @Input() show: boolean = true;
  @Input() showCallback?: Function;
  constructor() {}

  setDisabled = (is: boolean) => {
    this.disabled = is;
  };

  doClick = () => {
    this.click?.();
  };
}
