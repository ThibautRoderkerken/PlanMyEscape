import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IActivity, IHoliday } from "../../models/holiday";

@Component({
    selector: 'activity-modal',
    templateUrl: 'activity-modal.html',
  })
  export class ActivityModal {
    public valid: boolean = false;
  
    constructor(
      public dialogRef: MatDialogRef<ActivityModal>,
      @Inject(MAT_DIALOG_DATA) public data?: any
    ) { 
      this.holiday = data.holiday || {}
      this.activity = data.activity || {}
     }
  
    public activity: IActivity = {
  
    } as unknown as IActivity;
  
    public holiday: IHoliday
  
    ngOnInit() {
  
    }
  
    public close = () => {
      this.dialogRef.close(this.activity);
    };
  
    private _getCurrentDateForInput() {
      return this._getDateForInput(new Date(Date.now()));
    }
  
    private _getDateForInput(date: Date) {
      return new Date(date).toISOString().split('T')[0];
    }
  }