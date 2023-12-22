import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpRequestListComponent } from './components/helprequest-list/helprequest-list.component';
import { HelpRequestDetailsComponent } from './components/helprequest-details/helprequest-details.component';
import { HelpRequestCreationComponent } from './components/helprequest-creation/helprequest-creation.component';
import { RouterModule, Routes } from '@angular/router';
import { PrivilegeGuard } from '../guards/privilege/privilege.guard';
import { ChrComponentsModule } from '../chr-components/chr-components.module';
import { PipeModule } from '../pipe/pipe.module';
import { ReactiveFormsModule } from '@angular/forms';

const helprequestRoutes: Routes = [
  {path:'helprequest', component:HelpRequestListComponent, canActivate:[PrivilegeGuard], data: {privilege:'HELPREQUEST_LIST'}},
  {path:'helprequest/create', component:HelpRequestCreationComponent},
  //{path:'item/create', component:ItemCreationComponent, canActivate:[LoggedGuard]},
  {path:'helprequest/:request_id', component:HelpRequestDetailsComponent, canActivate:[PrivilegeGuard], data: {privilege:'HOLIDAY_DETAILS'}},
]


@NgModule({
  declarations: [
    HelpRequestListComponent,
    HelpRequestDetailsComponent,
    HelpRequestCreationComponent,
  ],
  imports: [
    CommonModule,    
    RouterModule.forChild(helprequestRoutes),
    ChrComponentsModule,
    ReactiveFormsModule,
    PipeModule,
  ]
})
export class HelprequestModule { }
