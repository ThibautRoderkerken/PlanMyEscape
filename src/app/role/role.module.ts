import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { RoleDetailsComponent } from './components/role-details/role-details.component';
import { LoggedGuard } from '../guards/logged/logged.guard';
import { AdminGuard } from '../guards/admin/admin.guard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChrComponentsModule } from '../chr-components/chr-components.module';
import { PrivilegeGuard } from '../guards/privilege/privilege.guard';

const rolesRoutes: Routes = [
  {
    path: 'role/:role_id',
    component: RoleDetailsComponent,
    canActivate: [LoggedGuard, PrivilegeGuard],
    data: { privilege: 'ROLE_DETAILS' },
  },
];

@NgModule({
  declarations: [RoleDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(rolesRoutes),
    FormsModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatAutocompleteModule,
    ChrComponentsModule,
  ],
})
export class RoleModule {}
