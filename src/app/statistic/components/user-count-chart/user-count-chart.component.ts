import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { IUser } from '../../../user/models/user';
import { StatisticService } from '../../services/statistic/statistic.service';
import { IUserCount } from '../../models/user';

@Component({
  selector: 'app-user-count-chart',
  templateUrl: './user-count-chart.component.html',
  styleUrls: ['./user-count-chart.component.scss'],
})
export class UserCountChart implements AfterViewInit {
  public userCountChart: any;

  @ViewChild('usercount') ref:ElementRef

  public users: IUserCount | null = null;

  public state: { date: number; user: IUser | null } = {
    date: new Date().getFullYear(),
    user: null,
  };

  constructor(
    private service: StatisticService,
  ) {
    this.service.getUserCounts().subscribe((res) => {
      this.users = res;
      this.createUserCountChart()
    });
  }
  ngAfterViewInit(): void {
    //this.createUserCountChart()
  }

  update = (user: IUser | null) => {
    this.userCountChart &&
      this.userCountChart.destroy();
    this.createUserCountChart();
  };

  createUserCountChart() {
    const active = this.users?.active
    const inactive = this.users?.inactive

    this.userCountChart = new Chart(this.ref.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Actifs', 'Inactifs'],
        datasets: [{
          data: [active, inactive],
          backgroundColor: ['#9BD0F5', '#FFB1C1']
        }
      ]
      },
    });
  }
}
