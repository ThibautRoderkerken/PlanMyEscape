import { Component } from '@angular/core';
import { IUser, User } from '../../models/user';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { ToastService } from '../../../services/toast/toast.service';
import { RouterService } from '../../../services/router/router.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { RoleService } from '../../../role/services/role/role.service';
import { Role } from '../../../role/models/Role';
import { MatDialog } from '@angular/material/dialog';
import { ChrDeleteModalComponent } from '../../../chr-components/chr-delete-modal/chr-delete-modal.component';
import { DialogService } from '../../../chr-components/services/dialog.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  public user: User;
  public roles: Role[] = [];

  public filteredRoleOptions: Observable<Role[]>;
  public searchRoleSelect = new FormControl<string>('---');

  public is_locked: boolean = true;

  constructor(
    private toast: ToastService,
    private userService: UserService,
    public roleService: RoleService,
    public router: RouterService,
    private builder: FormBuilder,
    public auth: AuthService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this._load();
    this._filterUserOptions();
  }

  addRole = () => {
    const roleValue = this.searchRoleSelect.value;
    if (typeof roleValue == 'string') return;

    const role = this.roles.find((r) => r.id == roleValue);

    if (this.user.roles.find((r) => r.id == role?.id)) return;

    role && this.user.roles.push(role);
    this._resetInputs();
  };

  removeRole = (role: Role) => {
    this.user.roles = this.user.roles.filter((r) => r.id != role.id);
  };

  put = () => {
    this.userService.put(this.user).subscribe((res) => {
      this.is_locked = true;
      this._load();
    });
  };

  toggleLock = () => {
    this.is_locked = !this.is_locked;
  };

  toggleActive = () => {
    if (!this.is_locked) this.user.isActive = !this.user.isActive;
  };

  getRoleName(id: number) {
    const tmp = this.roles.find((l) => l.id == id);
    return tmp ? tmp.name : '';
  }

  delete = () => {
    this.userService.delete(this.user).subscribe((res) => {
      this.router.navigateToUserList();
      this.toast.setSuccess(
        `L'utilisateur ${this.user.username} a bien été supprimé`
      );
    });
  };

  openDeleteDialog = () => {
    const dialogRef = this.dialogService.openDelete(this.delete);
  };

  private _resetInputs() {
    this.searchRoleSelect.setValue('---');
  }

  private _load() {
    this.userService
      .getById(this.route.snapshot.paramMap.get('user_id')!)
      .subscribe((res) => {
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
      this.roles = res;
    });
  }

  private _filterUserOptions() {
    this.filteredRoleOptions = this.searchRoleSelect.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterRole(value! || -1))
    );
  }

  private _filterRole(value: number | string): Role[] {
    return typeof value == 'string'
      ? this._doFilterRoleString(`${value}`)
      : this._doFilterRoleInt(value);
  }

  private _doFilterRoleInt(id: number) {
    const tmp = this.roles.find((u) => u.id == id);
    return tmp ? this.roles.filter((u) => u.id == tmp.id) : this.roles;
  }

  private _doFilterRoleString(input: string) {
    return this.roles.filter((u) => `${u.name}`.toLowerCase().includes(input));
  }
}
