import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, tap, of } from 'rxjs';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { IUser, User } from '../../../user/models/user';
import { UserService } from '../../../user/services/user/user.service';
import { RoleService } from '../../../role/services/role/role.service';
import { Role } from '../../../role/models/Role';
import { LoginDTO, ILoginDTO } from '../../models/login';
import { SocialUser } from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base_url: string = `${environment.apiUrl}auth/`;

  private user: User | null;

  private roleHierarchy: IRoleHierarchy = {};

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private roleService: RoleService,
    private router: RouterService
  ) {}

  init() {
    const logged = localStorage.getItem('isLoggedIn');
    if (logged == 'true') {
      this.fetchUser().subscribe((res) => {
        this.user = new User(
          res.id,
          res.username,
          res.email,
          res.firstname,
          res.lastname,
          res.isActive,
          res.roles,
        );
      });
      this.roleService.get().subscribe((res) => {
        this._initRoleHierarchy(res);
      });
    }
  }

  login(props: ILoginDTO, redirectUrl?: string) {
    return this.http.post(`${this.base_url}login`, props).pipe(
      map((data) => data as IUser),
      tap((res) => {
        this.user = new User(
          res.id,
          res.username,
          res.email,
          res.firstname,
          res.lastname,
          res.isActive,
          res.roles,
        );
        localStorage.setItem('isLoggedIn', 'true');
        redirectUrl && this.router.navigateTo(redirectUrl);
      })
    );
  }

  googleLogin(user:SocialUser, redirectUrl?: string) {
    return this.http.post(`${this.base_url}google-login`, user).pipe(
      map((data) => data as IUser),
      tap((res) => {
        this.user = new User(
          res.id,
          res.username,
          res.email,
          res.firstname,
          res.lastname,
          res.isActive,
          res.roles,
        );
        localStorage.setItem('isLoggedIn', 'true');
        redirectUrl && this.router.navigateTo(redirectUrl);
      })
    );
  }

  register = (props: ILoginDTO, redirectUrl?: string) => {
    return this.http.post(`${this.base_url}register`, props).pipe(
      map((data) => data as IUser),
      tap((res) => {
        this.user = new User(
          res.id,
          res.username,
          res.email,
          res.firstname,
          res.lastname,
          res.isActive,
          res.roles,
        );
        localStorage.setItem('isLoggedIn', 'true');
        redirectUrl && this.router.navigateTo(redirectUrl);
      })
    );
  }

  logout(redirectUrl?: string) {
    return this.http.post(`${this.base_url}logout`, null).pipe(
      tap((res) => {
        this.user = null;
        localStorage.removeItem('isLoggedIn');
        redirectUrl && this.router.navigateTo(redirectUrl);
      })
    );
  }

  hasRole(role_name: string) {
    return this.user?.hasRole(role_name);
  }

  hasPrivilege(privilege_name: string) {
    return this.user?.hasPrivilege(privilege_name);
  }

  hasAuthority(authority_name: string) {
    if (this.user == null) return false;
    for (const role of this.user.roles) {
      //If the role is exactly the same -> return true
      if (role.name == authority_name) {
        ("Had Exact Role")
        return true;
      }
      //If the role is higher -> return true
      if (
        this.roleHierarchy[role.name as any] <
        this.roleHierarchy[authority_name as any]
      ) {
        ("Had Higher Role")
        return true;
      }
    }
    ("Did not have permission")
    //The User either doesn't have the required role or he doesn't have a sufficient authority to bypass the role requirement
    return false;
  }

  hasPrivilegeAsync(autority_name: string) {
    if (this.user) {
      return of(this.hasPrivilege(autority_name));
    } else {
      return this.http.get(`${this.base_url}login`).pipe(
        map((data) => data as IUser),
        map((user) => {
          this.user = new User(
            user.id,
            user.username,
            user.email,
            user.firstname,
            user.lastname,
            user.isActive,
            user.roles,
          );
          return this.hasPrivilege(autority_name);
        })
      );
    }
  }

  hasAuthorityAsync(autority_name: string) {
    if (this.user) {
      return of(this.hasAuthority(autority_name));
    } else {
      return this.http.get(`${this.base_url}login`).pipe(
        map((data) => data as IUser),
        map((user) => {
          this.user = new User(
            user.id,
            user.username,
            user.email,
            user.firstname,
            user.lastname,
            user.isActive,
            user.roles,
          );
          return this.hasAuthority(autority_name);
        })
      );
    }
  }

  getId() {
    if (this.user) {
      return this.user.id;
    }
    return null;
  }

  getUsername() {
    if (this.user) {
      return `${this.user.firstname} ${this.user.lastname}`;
    }
    return null;
  }

  getFirstname() {
    if (this.user) {
      return `${this.user.firstname}`;
    }
    return null;
  }

  getEmail() {
    if (this.user) {
      return `${this.user.email}`;
    }
    return null;
  }

  getLastname() {
    if (this.user) {
      return `${this.user.lastname}`;
    }
    return null;
  }

  isLoggedIn() {
    const logged = localStorage.getItem('isLoggedIn');
    if (logged) {
      return logged == 'true';
    } else return this.user != null && this.user != undefined;
  }

  isLoggedInAsync() {
    const logged = localStorage.getItem('isLoggedIn');
    if (logged) {
      return of(logged == 'true');
    } else return of(this.user != null && this.user != undefined);
  }

  removeUser() {
    localStorage.removeItem('isLoggedIn');
    this.user = null;
  }

  fetchUser() {
    return this.http
      .get(`${this.base_url}login`)
      .pipe(map((data) => data as IUser));
  }

  private _parseRole(role: Role) {
    return role.name.split('_')[1];
  }

  private _initRoleHierarchy(roles: Role[]) {
    for (const role of roles) {
      this.roleHierarchy[role.name] = role.authorityLevel;
    }
  }
}

export interface IRoleHierarchy {
  [name: string]: number;
}

//LDAP://chrv.be
