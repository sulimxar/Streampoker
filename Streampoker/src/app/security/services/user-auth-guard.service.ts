import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService, UserServiceInjectionToken } from '@shared.module';
import { NavigationHelperService } from '../../services/navigation-helper.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    private navigationHelper: NavigationHelperService
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

    this.navigationHelper.navigateToLogin();

    return false;
  }
}

