import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { UserService } from './interfaces/user.service';

export { UserService } from './interfaces/user.service';
export const UserServiceInjectionToken = new InjectionToken<UserService>('UserService');

export { LoggingService } from './interfaces/logging.service';
export const LoggingServiceInjectionToken = new InjectionToken<UserService>('LoggingService');

export { BusyService } from './interfaces/busy.service';
export const BusyServiceInjectionToken = new InjectionToken<UserService>('BusyService');

export { NavigationService } from './interfaces/navigation.service';
export const NavigationServiceInjectionToken = new InjectionToken<UserService>('NavigationService');

export { AuthService } from './interfaces/auth.service';
export const AuthServiceInjectionToken = new InjectionToken<UserService>('AuthService');

export { UserAuthGuardService } from './interfaces/user-auth-guard.service';
export const UserAuthGuardServiceInjectionToken = new InjectionToken<UserService>('UserAuthGuardService');

export { UserRepositoryService } from './interfaces/user-repository.service';
export const UserRepositoryServiceInjectionToken = new InjectionToken<UserService>('UserRepositoryService');

export { AppUser } from './models/appUser';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SharedModule { }
