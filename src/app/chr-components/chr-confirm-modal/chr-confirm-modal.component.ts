import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chr-confirm-modal',
  templateUrl: './chr-confirm-modal.component.html',
  styleUrls: ['./chr-confirm-modal.component.scss'],
})
export class ChrConfirmModalComponent {
  public valid: boolean = false;

  constructor(public dialogRef: MatDialogRef<ChrConfirmModalComponent>) {}

  ngOnInit() {}

  public close = () => {
    this.dialogRef.close(true);
  };
}
