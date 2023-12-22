import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { IUserCount } from '../../models/user';
import { IHoliday } from 'src/app/holiday/models/holiday';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private base_url: string = `${environment.apiUrl}statistic/`;

  constructor(private http: HttpClient, private router: RouterService) {}

  getUserCounts = () => {
    return this.http.get(`${this.base_url}user`).pipe(
        map(data=>data as IUserCount)
    );
  };

  getHolidayCounts = (date: any) => {
    return this.http.get(`${this.base_url}holiday?date=${date}`).pipe(
        map(data=>data as IHoliday[][])
    );
  };
}
