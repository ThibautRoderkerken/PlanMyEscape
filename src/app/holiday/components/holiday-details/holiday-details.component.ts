import { Component, Inject } from '@angular/core';
import { Activity, Holiday, IActivity, IHoliday } from '../../models/holiday';
import { IUser, User } from 'src/app/user/models/user';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HolidayService } from '../../services/holiday/holiday.service';
import { UserService } from 'src/app/user/services/user/user.service';
import { RouterService } from 'src/app/services/router/router.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { DialogService } from 'src/app/chr-components/services/dialog.service';
import { ChrDeleteModalComponent } from 'src/app/chr-components/chr-delete-modal/chr-delete-modal.component';
import { ActivityModal } from '../activity-modal/activity-modal.component';

@Component({
  selector: 'app-holiday-details',
  templateUrl: './holiday-details.component.html',
  styleUrls: ['./holiday-details.component.scss']
})
export class HolidayDetailsComponent {
  public valid: boolean = false;
  public holiday: IHoliday;
  public users: IUser[] = []
  public is_locked: boolean = true;
  public country: any[] = []
  public weatherInfo: any = null

  constructor(
    public auth:AuthService,
    public dialog: MatDialog,
    private dialogService:DialogService,
    private toast: ToastService,
    public service: HolidayService,
    public userService: UserService,
    private router: RouterService,
    private route: ActivatedRoute
  ) {
    this.load()
  }

  toggleLock = () => {
    this.is_locked = !this.is_locked;
    this.load()
  };


  removeActivity = (activity: IActivity) => {
    this.holiday.activities = this.holiday.activities.filter(
      a => !(a.id == activity.id))
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

  weather = () => {
    this.service.weather(this.holiday)
  }

  downloadCalendar = () => {
    this.service.calendar(this.holiday).subscribe(
      response => {
        window.open( window.URL.createObjectURL(new Blob([response], {type: 'text/calendar'})))
      }
    )
  }

  createDialog = () => {
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

  goBack = () => {
    this.router.navigateTo('holiday');
  };

  openDeleteDialog = () => {
    const dialogRef = this.dialogService.openDelete(this.delete);
  };

  openConfirmDialog = () => {
    const dialogRef = this.dialogService.openConfirm(this.publish);
  };

  load = () => {
    this.service
    .getById(this.route.snapshot.paramMap.get('holiday_id')!)
    .subscribe((res) => {
      this.holiday = res
      this.service.weather(this.holiday).subscribe(
        res => this.weatherInfo = res
      )
    });
    this.service.country().subscribe(
      res =>{
        (res)
        this.country = res
      }
    )
    this.userService.get().subscribe( 
      res => this.users = res
    )
  }

  put = () => {
    this.service.put(this.holiday).subscribe((res) => {
      this.is_locked = true;
      this.load();
    });
  };

  publish = () => {
    this.holiday.isPublished = true
    this.put()
  }

  delete = () => {
    this.service.delete(this.holiday).subscribe((res) => {
      this.router.navigateToHolidayList();
      this.toast.setSuccess(
        `Les vacances ${this.holiday.name} du ${this.holiday.startAt} au ${this.holiday.endAt} ont bien été supprimées`
      );
    });
  };
}