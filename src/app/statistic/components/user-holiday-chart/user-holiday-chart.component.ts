import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { StatisticService } from '../../services/statistic/statistic.service';
import { IHoliday } from 'src/app/holiday/models/holiday';

@Component({
  selector: 'app-user-holiday-chart',
  templateUrl: './user-holiday-chart.component.html',
  styleUrls: ['./user-holiday-chart.component.scss'],
})
export class UserHolidayChart implements AfterViewInit {
  public userHolidayChart: any;

  @ViewChild('userholiday') ref:ElementRef

  public countries: IHoliday[][] | null = null;

  public state: { date: Date } = {
    date: new Date(),
  };

  constructor(
    private service: StatisticService,
  ) {
    this.service.getHolidayCounts(new Date().toISOString()).subscribe((res) => {
      this.countries = res;
      this.createUserCountChart()
    });
  }
  ngAfterViewInit(): void {
    //this.createUserCountChart()
  }

  update = (date: Date | null) => {
    this.userHolidayChart &&
      this.userHolidayChart.destroy();
    this.service.getHolidayCounts(this.state.date).subscribe((res) => {
      this.countries = res;
      this.createUserCountChart()
    });
  };

  createUserCountChart() {
    //const active = this.users?.active
    //const inactive = this.users?.inactive
    (this.countries![0])
    this.userHolidayChart = new Chart(this.ref.nativeElement, {
      type: 'polarArea',
      data: {
        labels: this.countries?.map(c=>c[0].country),
        datasets: [{
          label: 'My First Dataset',
          data: this.countries?.map(
            c=>
              //+1 To include the owner
              c.map(h=>h.users.length + 1).reduce((acc, curr) => acc + curr)
          ),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ]
        }]
      },
      options: {

      }
    });
  }
}
