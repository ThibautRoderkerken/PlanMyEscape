import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url: string = `${environment.apiUrl}user/`;

  constructor(private http: HttpClient, private router: RouterService) {}

  get = () => {
    return this.http.get(this.base_url).pipe(
      map((data) => {
        return data as IUser[];
      })
    );
  };

  getLDAP = (list?: IUser[]) => {
    return this.http.get(`${this.base_url}ldap`).pipe(
      map((data) => {
        return data as IUser[];
      })
    );
  };

  getById = (id: string) => {
    return this.http
      .get(`${this.base_url}${id}`)
      .pipe(map((data) => data! as IUser));
  };

  put = (user: IUser) => {
    return this.http
      .put(`${this.base_url}${user.id}`, user, {})
      .pipe(map((data) => data as IUser));
  };

  delete = (user: IUser) => {
    return this.http
      .delete(`${this.base_url}${user.id}`)
      .pipe(map((data) => data as boolean));
  };

  display = (user: IUser) => {
    if (!user) return;
    return `${user.firstname} ${user.lastname}`;
  };

  displayEmail = (user: IUser) => {
    if (!user) return;
    return `${user.firstname||''} ${user.lastname||''} (${user.email})`;
  };
}
