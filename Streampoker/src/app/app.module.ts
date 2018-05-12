import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { ConsoleLoggingService, CoreModule, RouterNavigationService, ToggleBusyService } from '@core.module';
import { RoomModule } from '@room.module';
import { AuthenticatedUserService, InteractiveUserAuthGuardService } from '@security.module';
import { BusyServiceInjectionToken, LoggingServiceInjectionToken, NavigationServiceInjectionToken,
   UserAuthGuardServiceInjectionToken, UserServiceInjectionToken } from '@shared.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';


export function tokenGetterFactory() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    RoomModule,
    SecurityModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterFactory,
        whitelistedDomains: []
      }
    }),
    RouterModule.forRoot([
      //{ path: '', component: RoomComponent, canActivate: [UserAuthGuardServiceInjectionToken] }
    ],
    // {
    //   onSameUrlNavigation: 'reload',
    //   initialNavigation: false
    // }
  )
  ],
  providers: [
    {
      provide: UserServiceInjectionToken,
      useClass: AuthenticatedUserService
    },
    {
      provide: UserAuthGuardServiceInjectionToken,
      useClass: InteractiveUserAuthGuardService
    },
    {
      provide: NavigationServiceInjectionToken,
      useClass: RouterNavigationService 
    },
    {
      provide: LoggingServiceInjectionToken,
      useClass: ConsoleLoggingService 
    },
    {
      provide: BusyServiceInjectionToken,
      useClass: ToggleBusyService 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
