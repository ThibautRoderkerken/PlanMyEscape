import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaticModule } from './static/static.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './config/AuthInterceptor';
import { ErrorInterceptor } from './config/ErrorInterceptor';
import { SpinnerInterceptor } from './config/SpinnerInterceptor';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { SettingModule } from './setting/setting.module';
import { LowerCaseUrlSerializer } from './config/LowercaseUrlSerializer';
import { UrlSerializer } from '@angular/router';
import { HolidayModule } from './holiday/holiday.module';
import { ChatModule } from './chat/chat.module';
import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { HelprequestModule } from './helprequest/helprequest.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    UserModule,
    RoleModule,
    SettingModule,
    HolidayModule,
    ChatModule,
    HelprequestModule,

    //IMPORTANT: LEAVE THE STATIC MODULE AFTER THE OTHER APP MODULES OR IT WILL OVERRIDE OTHER MODULES' ROUTES
    StaticModule,
  ],
  exports: [HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
    {provide: LOCALE_ID, useValue: 'fr' },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId, {
                oneTapEnabled: false,
                scopes: ['email', 'firstname', 'lastname'],
              }
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
