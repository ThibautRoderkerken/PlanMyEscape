import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Role } from 'src/app/role/models/Role';
import { RoleService } from '../../../role/services/role/role.service';
import { RouterService } from '../../../services/router/router.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { DialogService } from '../../../chr-components/services/dialog.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-role-settings',
  templateUrl: './role-settings.component.html',
  styleUrls: ['./role-settings.component.scss'],
})
export class RoleSettingsComponent {
  public is_locked: boolean = true;

  public roles: Role[] = [];

  public form: FormGroup;

  constructor(
    public auth: AuthService,
    private roleService: RoleService,
    private dialogService: DialogService,
    private toast: ToastService,
    private builder: FormBuilder,
    public router: RouterService
  ) {
    this.form = builder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      level: [this.roles.length, [Validators.required, Validators.min(1)]],
    });
    this._load();
  }

  public put = () => {
    //We try to add what is left in the inputs before validating
    this.addRole();
    for (const role of this.roles) {
      if (role.id != undefined && role.id != null) {
        this.roleService.put(role).subscribe((res) => (this.is_locked = true));
      } else {
        this.roleService.post(role).subscribe((res) => {
          let role = this.roles.find(
            (r) => r.name == res.name && r.authorityLevel == res.authorityLevel
          );
          if (role) role.id = res.id;
          this.is_locked = true;
        });
      }
    }
  };

  public addRole() {
    if (this.form.valid) {
      const value: string = this.form.controls['name'].value;
      if (value.search('ROLE_') == -1) {
        const role = {
          name: `ROLE_${value}`,
          authorityLevel: this.form.controls['level'].value,
        } as Role;
        this.roles.push(role);
        this._patchValue();
      }
    }
  }

  public toggleLock = () => {
    //If we are updating the roles and we cancel the update, then we refetch the data
    if (!this.is_locked) this._loadRoles();
    this.is_locked = !this.is_locked;
  };

  public goToDetails = (role: Role) => {
    this.router.navigateTo(`role/${role.id}`);
  };

  public delete = (role: Role) => {
    if (role.id == null || role.id == undefined) {
      this.roles = this.roles.filter(
        (t) => t.name != role.name && t.authorityLevel != role.authorityLevel
      );
      return;
    }
    this.roleService.delete(role).subscribe((res) => {
      this.roles = this.roles.filter((t) => t.id != role.id);
      this.toast.setSuccess(`Le role ${role.name} a bien été supprimé`);
    });
  };

  public openDeleteDialog = (role: Role) => {
    this.dialogService.openDelete(this.delete, role);
  };

  private _load() {
    this._loadRoles();
  }

  private _patchValue() {
    this.form.patchValue({ level: this.roles.length + 1 });
  }

  private _loadRoles() {
    this.roleService.get().subscribe((res) => {
      this.roles = res;
      this._patchValue();
    });
  }
}
