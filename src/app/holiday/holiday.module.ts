import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipe/pipe.module';
import { ChrComponentsModule } from '../chr-components/chr-components.module';
import { RouterModule, Routes } from '@angular/router';
import { PrivilegeGuard } from '../guards/privilege/privilege.guard';
import { HolidayListComponent } from './components/holiday-list/holiday-list.component';
import { HolidayCreationComponent } from './components/holiday-creation/holiday-creation.component';
import { HolidayDetailsComponent } from './components/holiday-details/holiday-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivityModal } from './components/activity-modal/activity-modal.component';

const holidayRoutes: Routes = [
  {path:'holiday', component:HolidayListComponent, canActivate:[PrivilegeGuard], data: {privilege:'HOLIDAY_LIST'}},
  {path:'holiday/create', component:HolidayCreationComponent, canActivate:[PrivilegeGuard], data: {privilege:'HOLIDAY_CREATE'}},
  //{path:'item/create', component:ItemCreationComponent, canActivate:[LoggedGuard]},
  {path:'holiday/:holiday_id', component:HolidayDetailsComponent, canActivate:[PrivilegeGuard], data: {privilege:'HOLIDAY_DETAILS'}},
]

@NgModule({
  declarations: [
    HolidayListComponent,
    HolidayCreationComponent,
    HolidayDetailsComponent,
    ActivityModal,
  ],
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
    RouterModule.forChild(holidayRoutes),
    ChrComponentsModule,
  ],
  exports: [
    HolidayListComponent,
    HolidayCreationComponent,
    HolidayDetailsComponent,
    ActivityModal,
  ],
})
export class HolidayModule { }
