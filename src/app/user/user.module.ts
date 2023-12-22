import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminGuard } from '../guards/admin/admin.guard';
import { Routes, RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PrivilegeGuard } from '../guards/privilege/privilege.guard';
import { ChrComponentsModule } from '../chr-components/chr-components.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

const userRoutes: Routes = [
  {
    path: 'user',
    component: UserListComponent,
    canActivate: [PrivilegeGuard],
    data: { privilege: 'USER_LIST' },
  },
  {
    path: 'user/:user_id',
    component: UserDetailsComponent,
    canActivate: [PrivilegeGuard],
    data: { privilege: 'USER_DETAILS' },
  },
];

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    PipeModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    ChrComponentsModule,
    MatTooltipModule,
    RouterModule.forChild(userRoutes),
  ],
  exports: [UserListComponent],
})
export class UserModule {}
