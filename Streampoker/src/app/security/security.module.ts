import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FirebaseAuthService } from './services/firebase.auth.service';
import { AuthServiceInjectionToken, UserRepositoryServiceInjectionToken} from '@shared.module';
import { FirebaseUserRepositoryService } from '@data-layer.module';

export { AuthenticatedUserService } from './services/authenticated-user.service';
export { InteractiveUserAuthGuardService } from './services/interactive-user-auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {
      provide: AuthServiceInjectionToken,
      useClass: FirebaseAuthService
    },
    {
      provide: UserRepositoryServiceInjectionToken,
      useClass: FirebaseUserRepositoryService
    }
  ]
})
export class SecurityModule { }
