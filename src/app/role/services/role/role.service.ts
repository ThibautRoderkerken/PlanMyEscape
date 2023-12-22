import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { Role, Privilege } from '../../models/Role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private base_url: string = `${environment.apiUrl}role/`;

  constructor(private http: HttpClient, private router: RouterService) {}

  get = () => {
    return this.http
      .get(`${this.base_url}`)
      .pipe(map((data) => data as Role[]));
  };

  getById = (id: string) => {
    return this.http
      .get(`${this.base_url}${id}`)
      .pipe(map((data) => data as Role));
  };

  put = (role: Role) => {
    return this.http
      .put(`${this.base_url}${role.id}`, role, {})
      .pipe(map((data) => data as Role));
  };

  post = (role: Role) => {
    return this.http
      .post(`${this.base_url}`, role, {})
      .pipe(map((data) => data as Role));
  };

  delete = (role: Role) => {
    return this.http.delete(`${this.base_url}${role.id}`);
  };

  privilegesDisplay = (privileges: Privilege[]) => {
    return privileges.map((p) => p.name).join(', ');
  };

  hasPrivilege = (role: Role, privilege: Privilege) => {
    if (!role.privileges) return false;
    for (const priv of role.privileges) {
      if (priv.name == privilege.name) return true;
    }
    return false;
  };

  hasNotPrivilege = (role: Role, privilege: Privilege) => {
    if (!role.privileges) return true;
    for (const priv of role.privileges) {
      if (priv.name == privilege.name) return false;
    }
    return true;
  };
}
