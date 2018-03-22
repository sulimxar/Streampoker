import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { NavigationHelperService } from './navigation-helper.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(
    private router: Router,
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

