import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FirebaseAuthService } from './services/firebase.auth.service';
import { AuthServiceInjectionToken } from '@shared.module';

export { AuthenticatedUserService } from './services/authenticated-user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {
      provide: AuthServiceInjectionToken,
      useClass: FirebaseAuthService
    }
  ]
})
export class SecurityModule { }
