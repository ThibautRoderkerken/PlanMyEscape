import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { IHelpRequest } from '../models/helprequest';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {
  private base_url: string = `${environment.apiUrl}helprequest/`;

  constructor(private http: HttpClient, private router: RouterService, private auth:AuthService) {}

  get = () => {
    return this.http.get(this.base_url).pipe(map((data) => data as IHelpRequest[]));
  };

  getById = (id: string) => {
    return this.http
      .get(`${this.base_url}${id}`)
      .pipe(map((data) => data as IHelpRequest));
  };

  put = (request: IHelpRequest) => {
    return this.http
      .put(`${this.base_url}${request.id}`, request, {})
      .pipe(map((data) => data as IHelpRequest));
  };

  post(request: IHelpRequest) {
    return this.http
      .post(`${this.base_url}`, request)
      .pipe(map((data) => data as IHelpRequest));
  }

  delete = (request: IHelpRequest) => {
    return this.http.delete(`${this.base_url}${request.id}`);
  };
}
