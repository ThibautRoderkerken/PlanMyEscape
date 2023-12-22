import { first } from 'rxjs';
import { Role } from 'src/app/role/models/Role';

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
  roles: Role[];
}

export class User implements IUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
  roles: Role[];

  constructor(
    id: number,
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    isActive: boolean = true,
    roles: Role[],

  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.isActive = isActive;
    this.roles = roles;
  }

  hasPrivilege(privilege_name: string) {
    for (const role of this.roles) {
      for (const privilege of role.privileges!) {
        if (privilege.name.toLowerCase() == privilege_name.toLowerCase())
          return true;
      }
    }
    return false;
  }

  hasRole(role_name: string) {
    for (const role of this.roles) {
      if (role.name == role_name) return true;
    }
    return false;
  }

  private _parseRole(role: Role) {
    return role.name[1];
  }
}
