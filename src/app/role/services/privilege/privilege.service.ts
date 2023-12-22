import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { IUser } from '../../../user/models/user';
import { Privilege } from '../../models/Role';

@Injectable({
  providedIn: 'root',
})
export class PrivilegeService {
  private base_url: string = `${environment.apiUrl}privilege/`;

  constructor(private http: HttpClient, private router: RouterService) {}

  get = () => {
    return this.http
      .get(`${this.base_url}`)
      .pipe(map((data) => data as Privilege[]));
  };

  display = (privilege: Privilege) => {
    return privilege?.name;
  };

  /*   getById = (id:string) => {
    return this.http.get(`${this.base_url}${id}`).pipe(
      map((data) => data as Role)
    )
  }

  put = (role:Role) => {
    return this.http.put(`${this.base_url}${role.id}`, role, {}).pipe(
      map((data) => data as Role)
    )
  }

  post = (role:Role) => {
    return this.http.post(`${this.base_url}`, role, {}).pipe(
      map((data) => data as Role)
    )
  } */
}
