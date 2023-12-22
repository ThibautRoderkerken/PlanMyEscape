import { Component, Inject } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HolidayService } from '../../services/holiday/holiday.service';
import { UserService } from 'src/app/user/services/user/user.service';
import { RouterService } from 'src/app/services/router/router.service';
import { ActivatedRoute } from '@angular/router';
import { Activity, Holiday, IActivity, IHoliday } from '../../models/holiday';
import { IUser } from 'src/app/user/models/user';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivityModal } from '../activity-modal/activity-modal.component';

@Component({
  selector: 'app-holiday-creation',
  templateUrl: './holiday-creation.component.html',
  styleUrls: ['./holiday-creation.component.scss']
})
export class HolidayCreationComponent {
  public valid: boolean = false;
  public holiday: IHoliday = new Holiday();
  public users: IUser[] = []
  public country: any[] = []
  constructor(
    public dialog: MatDialog,
    private toast: ToastService,
    public service: HolidayService,
    public userService: UserService,
    private router: RouterService,
    private route: ActivatedRoute
  ) {
    userService.get().subscribe( 
      res => this.users = res
    )
    this.service.country().subscribe(
      res =>{
        (res)
        this.country = res
      }
    )
  }

  removeActivity = (activity: IActivity) => {
    this.holiday.activities = this.holiday.activities.filter(
      a => !(a.destination == activity.destination &&
      a.startAt==activity.startAt &&
      a.endAt==activity.endAt))
  }

  removeUser = (user: IUser) => {
    this.holiday.users = this.holiday.users.filter(
      u => !(u.id == user.id))
  }

  addUser = (user: IUser) => {
    if(typeof user == 'string')
      this.holiday.users.push( {email: user} as unknown as IUser)
    else 
      this.holiday.users.push(user)
  }

  startAt = () => this.holiday.startAt

  endAt = () => this.holiday.endAt

  createDialog() {
    const dialogRef = this.dialog.open(ActivityModal, {data: {holiday: this.holiday}, autoFocus: true});

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result == 'object') {
        this.holiday.activities.push(result)
      }
    });
  }

  updateDialog = (activity: IActivity) => {
    const dialogRef = this.dialog.open(ActivityModal,  {data: {holiday: this.holiday, activity: {...activity}}, autoFocus: true});
    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result == 'object') {
        this.holiday.activities = this.holiday.activities.filter(a=>a.id != activity.id)
        this.holiday.activities.push(result)
      }
    });
  };

  post = () => {
    this.service.post(this.holiday).subscribe((res) => {
      this.router.navigateTo(`/holiday/${res.id}`);
      this.toast.setSuccess();
    });
  };

  goBack = () => {
    this.router.navigateTo('item');
  };

}