import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';

export { AuthenticatedUserService } from './services/authenticated-user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService
  ]
})
export class SecurityModule { }
