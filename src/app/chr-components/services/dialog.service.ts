import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { map } from 'rxjs';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ChrDeleteModalComponent } from '../chr-delete-modal/chr-delete-modal.component';
import { ChrConfirmModalComponent } from '../chr-confirm-modal/chr-confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDelete = (callback?: Function, callbackElement?: any) => {
    const dialogRef = this.open(ChrDeleteModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      (result);
      if (result == true) callback?.(callbackElement);
    });
  };

  openConfirm = (callback?: Function, callbackElement?: any) => {
    const dialogRef = this.open(ChrConfirmModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      (result);
      if (result == true) callback?.(callbackElement);
    });
  };

  open = (component: any) => {
    (this.dialog)
    return this.dialog.open(component);
  };
}
