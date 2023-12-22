import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { RouterService } from 'src/app/services/router/router.service';
import { IUser } from 'src/app/user/models/user';
import { UserService } from 'src/app/user/services/user/user.service';
import { HolidayListDataSource } from './holiday-list-datasource';
import { HolidayService } from '../../services/holiday/holiday.service';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent {
  dataSource: HolidayListDataSource = new HolidayListDataSource([]);
  public users: IUser[] = [];
  public sortBy: string = 'id';
  public isAsc: boolean = false;
  public filterBy = new FormControl<IUser | null>(null);
  public filterBy2 = new FormControl<boolean | null>(null);
  public searchBy = new FormControl<string>('');

  constructor(
    public holidayService: HolidayService,
    public userService: UserService,
    public router: RouterService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.dataSource = new HolidayListDataSource([]);
    this.holidayService.get().subscribe((res) => {
      this.dataSource = new HolidayListDataSource(res);
    });
    this.userService.get().subscribe((res) => (this.users = res));
  }

  goTo(id: number) {
    this.router.navigateTo(`/holiday/${id}`);
  }

  goToHolidayCreation() {
    this.router.navigateTo(`/holiday/create`);
  }

  resetFilter() {
    this.filterBy.setValue(null);
  }

  resetFilter2() {
    this.filterBy2.setValue(null);
  }

  downloadCalendar = () => {
    this.holidayService.allCalendar().subscribe(
      response => {
        window.open( window.URL.createObjectURL(new Blob([response], {type: 'text/calendar'})))
      }
    )
  }
}
