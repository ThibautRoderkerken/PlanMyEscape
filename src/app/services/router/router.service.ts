import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../user/models/user';
import { Role } from 'src/app/role/models/Role';
import { IHoliday } from 'src/app/holiday/models/holiday';
import { IHelpRequest } from 'src/app/helprequest/models/helprequest';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router, private location: Location) {}

  public navigateTo = (uri: string, data?: object) => {
    this.router.navigate([uri], { state: data });
  };

  public navigateBack = () => {
    this.location.back();
  };

  getCurrentNavigation() {
    return this.router.getCurrentNavigation();
  }

  //USER
  public navigateToUserDetails = (user: IUser) => {
    return this.navigateTo(`user/${user.id}`);
  };

  public navigateToUserList = () => {
    return this.navigateTo('user');
  };

  //Role
  public navigateToRoleDetails = (role: Role) => {
    return this.navigateTo(`role/${role.id}`);
  };

  //Holiday
  public navigateToHolidayDetails = (holiday: IHoliday) => {
    return this.navigateTo(`holiday/${holiday.id}`);
  };

  public navigateToHolidayList = () => {
    return this.navigateTo(`holiday`);
  };

  //HelpRequest
  public navigateToRequestDetails = (request: IHelpRequest) => {
    return this.navigateTo(`helprequest/${request.id}`);
  };

  public navigateToRequestList = () => {
    return this.navigateTo(`helprequest`);
  };
}
