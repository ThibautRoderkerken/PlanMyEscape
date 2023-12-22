import { Component } from '@angular/core';
import { ToastService } from '../../../services/toast/toast.service';
import { RoleService } from '../../services/role/role.service';
import { RouterService } from '../../../services/router/router.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { Role, Privilege } from '../../models/Role';
import { PrivilegeService } from '../../services/privilege/privilege.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss'],
})
export class RoleDetailsComponent {
  public role: Role;
  public privilege: Privilege;
  public privileges: Privilege[];
  public filteredPrivilegeOptions: Observable<Privilege[]>;
  public searchPrivilegeSelect = new FormControl<string>('---');

  public is_locked: boolean = true;

  constructor(
    private toast: ToastService,
    public roleService: RoleService,
    public privilegeService: PrivilegeService,
    private router: RouterService,
    private builder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._load();
    this._filterPrivilegeOptions();
  }

  addPrivilege = (privilege: Privilege | string) => {
    if (privilege == null || privilege == undefined) return;
    if (typeof privilege == 'string')
      this.role.privileges?.push({ name: privilege } as Privilege);
    else {
      this.role.privileges?.push(privilege);
    }
    (this.privilege as any) = null;
    /*
    const privilegeValue = this.searchPrivilegeSelect.value;

    let privilege = null;

    if (typeof privilegeValue == 'string') {
      privilege = { name: privilegeValue } as Privilege;
      privilege && this.role.privileges!.push(privilege);
    } else {
      privilege = this.privileges.find((r) => r.id == privilegeValue);
      privilege && this.role.privileges!.push(privilege);
    }

    this._resetInputs();
    */
  };

  removePrivilege = (role: Privilege) => {
    this.role.privileges = this.role.privileges!.filter(
      (r) => r.name != role.name
    );
  };

  put = () => {
    this.roleService.put(this.role).subscribe((res) => {
      this.is_locked = true;
      this._load();
      this.toast.setSuccess();
    });
  };

  toggleLock = () => {
    this.is_locked = !this.is_locked;
  };

  getPrivilegeName(id: number) {
    const tmp = this.privileges.find((l) => l.id == id);
    return tmp ? tmp.name : '';
  }

  getNew = () => {};

  private _resetInputs() {
    this.searchPrivilegeSelect.setValue('---');
  }

  private _load() {
    this.roleService
      .getById(this.route.snapshot.paramMap.get('role_id')!)
      .subscribe((res) => {
        this.role = res;
      });
    this.privilegeService.get().subscribe((res) => {
      this.privileges = res;
    });
  }

  private _filterPrivilegeOptions() {
    this.filteredPrivilegeOptions =
      this.searchPrivilegeSelect.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterPrivilege(value! || -1))
      );
  }

  private _filterPrivilege(value: number | string): Privilege[] {
    return typeof value == 'string'
      ? this._doFilterPrivilegeString(`${value}`)
      : this._doFilterPrivilegeInt(value);
  }

  private _doFilterPrivilegeInt(id: number) {
    const tmp = this.privileges.find((u) => u.id == id);
    return tmp
      ? this.privileges.filter((u) => u.id == tmp.id)
      : this.privileges;
  }

  private _doFilterPrivilegeString(input: string) {
    return this.privileges.filter((u) =>
      `${u.name}`.toLowerCase().includes(input.toLowerCase())
    );
  }
}
