import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthenticatedUserService } from '@security.module';
import { UserAuthGuard } from '@security/services/user-auth-guard.service';
import { UserServiceInjectionToken } from '@shared.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { RoomComponent } from './room/room.component';
import { SecurityModule } from './security/security.module';
import { BusyService } from './services/busy.service';
import { LoggingService } from './services/logging.service';
import { NavigationHelperService } from './services/navigation-helper.service';


export function tokenGetterFactory() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomComponent,
    NoAccessComponent
  ],
  imports: [
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
      { path: '', component: RoomComponent, canActivate: [UserAuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent },
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
    UserAuthGuard,
    NavigationHelperService,
    LoggingService,
    BusyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
