import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chr-delete-modal',
  templateUrl: './chr-delete-modal.component.html',
  styleUrls: ['./chr-delete-modal.component.scss'],
})
export class ChrDeleteModalComponent {
  public valid: boolean = false;

  constructor(public dialogRef: MatDialogRef<ChrDeleteModalComponent>) {}

  ngOnInit() {}

  public close = () => {
    this.dialogRef.close(true);
  };
}
