import { Mark } from './models/mark';
import { NavigationService } from './interfaces/navigation.service';
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { UserService } from './interfaces/user.service';
import { LoggingService } from './interfaces/logging.service';
import { BusyService } from './interfaces/busy.service';
import { AuthService } from './interfaces/auth.service';
import { UserRepositoryService } from './interfaces/user-repository.service';
import { RoomRepositoryService } from './interfaces/room-repository.service';
import { UserAuthGuardService } from './interfaces/user-auth-guard.service';
import { RoomService } from './interfaces/room.service';
import { TimeService } from './interfaces/time.service';


// ===================================  EXPORT


// Models

export { AppUser } from './models/appUser';
export { Room } from './models/room';
export { Guest } from './models/guest';
export { Mark } from './models/mark';
export { History } from './models/history';

// Classes



// Interfaces

export type UserService = UserService;
export type LoggingService = LoggingService;
export type BusyService = BusyService;
export type NavigationService = NavigationService;
export type AuthService = AuthService;
export type UserAuthGuardService = UserAuthGuardService;
export type UserRepositoryService = UserRepositoryService;
export type RoomRepositoryService = RoomRepositoryService;
export type RoomService = RoomService;
export type TimeService = TimeService;

// Tokens

export const UserServiceInjectionToken = new InjectionToken<UserService>('UserService');
export const LoggingServiceInjectionToken = new InjectionToken<LoggingService>('LoggingService');
export const BusyServiceInjectionToken = new InjectionToken<BusyService>('BusyService');
export const NavigationServiceInjectionToken = new InjectionToken<NavigationService>('NavigationService');
export const AuthServiceInjectionToken = new InjectionToken<UserService>('AuthService');
export const UserAuthGuardServiceInjectionToken = new InjectionToken<AuthService>('UserAuthGuardService');
export const UserRepositoryServiceInjectionToken = new InjectionToken<UserRepositoryService>('UserRepositoryService');
export const RoomRepositoryServiceInjectionToken = new InjectionToken<RoomRepositoryService>('RoomRepositoryService');
export const RoomServiceInjectionToken = new InjectionToken<RoomService>('RoomService');
export const TimeServiceInjectionToken = new InjectionToken<TimeService>('TimeService');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SharedModule { }
