import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { UserService } from './interfaces/user.service';

export { UserService } from './interfaces/user.service';
export const UserServiceInjectionToken = new InjectionToken<UserService>('UserService');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SharedModule { }
