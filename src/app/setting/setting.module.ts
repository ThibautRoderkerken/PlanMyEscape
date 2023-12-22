import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { RoleSettingsComponent } from './components/role/role-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from '../guards/logged/logged.guard';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChrComponentsModule } from '../chr-components/chr-components.module';
import { PrivilegeGuard } from '../guards/privilege/privilege.guard';

const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [LoggedGuard, PrivilegeGuard],
    data: { privilege: 'SETTING_LIST' },
  },
];

@NgModule({
  declarations: [
    RoleSettingsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(settingsRoutes),
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
    MatAutocompleteModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    ChrComponentsModule,
  ],
})
export class SettingModule {}
