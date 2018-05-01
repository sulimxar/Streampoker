import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NavigationService, NavigationServiceInjectionToken, UserService, UserServiceInjectionToken } from '@shared.module';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.userService.isInitialized) {
      // User auth service is not initialized, so ignore all activations without redirecting to
      // the Login page. When it's initialized app.component will take care about the rest.
      return false;
    }

    if (this.userService.isLoggedIn) {
      return true;
    }

    this.navigationService.navigateToLogin();

    return false;
  }
}

