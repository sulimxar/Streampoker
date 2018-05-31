import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NavigationService, NavigationServiceInjectionToken, UserService, UserServiceInjectionToken, 
  UserAuthGuardService } from '@shared.module';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InteractiveUserAuthGuardService implements UserAuthGuardService {

  constructor(
    private router: Router,
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.isInitialized) {
      const promise = this.userService.whenInitialized;
      return promise.then(() => {
        return this.canActivateLogic(state);
      }, error => {
          return false;
      });
    }

    return this.canActivateLogic(state);
  }

  private canActivateLogic(state: RouterStateSnapshot): boolean {
    if (this.userService.isLoggedIn) {
      return true;
    }

    this.navigationService.navigateToLogin(state.url);

    return false;
  }
}

