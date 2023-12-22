import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from '../guards/logged/logged.guard';
import { PrivilegeGuard } from '../guards/privilege/privilege.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChrComponentsModule } from '../chr-components/chr-components.module';
import { MatButtonModule } from '@angular/material/button';
import { UserCountChart } from './components/user-count-chart/user-count-chart.component';
import { UserHolidayChart } from './components/user-holiday-chart/user-holiday-chart.component';

const statisticRoutes: Routes = [

];

@NgModule({
  declarations: [
    UserCountChart,
    UserHolidayChart,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ChrComponentsModule,
    MatDatepickerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(statisticRoutes),
  ],
  exports: [
    UserCountChart,
    UserHolidayChart,
  ]
})
export class StatisticModule {}
