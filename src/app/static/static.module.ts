import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../config/AuthInterceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoggedGuard } from '../guards/logged/logged.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from '../guards/admin/admin.guard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StatisticModule } from '../statistic/statistic.module';

const staticRoutes: Routes = [
  {path: '', component: DashboardComponent, data: {silent:true}},
  {path: '**', component: NotFoundComponent}
] 
 
@NgModule({
  declarations: [
    NotFoundComponent,
    DashboardComponent,
    HeaderComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(staticRoutes),
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
    StatisticModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  exports: [
    NotFoundComponent,
    DashboardComponent,
    HeaderComponent,
  ]
})
export class StaticModule { }
