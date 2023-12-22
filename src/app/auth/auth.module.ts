import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../config/AuthInterceptor';
import { ChrComponentsModule } from '../chr-components/chr-components.module';
import { RegisterComponent } from './components/register/register.component';
import {  GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoggedGuard } from '../guards/logged/logged.guard';

const authRoutes: Routes = [
  { path:'login', component: LoginComponent},
  { path:'register', component: RegisterComponent}
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ChrComponentsModule,
    GoogleSigninButtonModule,
    SocialLoginModule,
    RouterModule.forChild(authRoutes),
  ],
})
export class AuthModule {}
