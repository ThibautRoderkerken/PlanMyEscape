import { Component } from '@angular/core';
import { HelpRequestListDataSource } from './holiday-list-datasource';
import { IHelpRequest } from '../../models/helprequest';
import { RouterService } from 'src/app/services/router/router.service';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { HelpRequestService } from '../../services/helprequest.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-helprequest-list',
  templateUrl: './helprequest-list.component.html',
  styleUrls: ['./helprequest-list.component.scss']
})
export class HelpRequestListComponent {
  dataSource: HelpRequestListDataSource = new HelpRequestListDataSource([]);
  public requests: IHelpRequest[] = [];
  public sortBy: string = 'id';
  public isAsc: boolean = false;
  public searchBy = new FormControl<string>('');

  constructor(
    public requestService: HelpRequestService,
    public router: RouterService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.dataSource = new HelpRequestListDataSource([]);
    this.requestService.get().subscribe((res) => {
      this.dataSource = new HelpRequestListDataSource(res);
    });
  }

  goTo(id: number) {
    this.router.navigateTo(`/request/${id}`);
  }

  goToRequestCreation() {
    this.router.navigateTo(`/request/create`);
  }
}
