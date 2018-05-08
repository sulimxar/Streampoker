import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

export interface UserAuthGuardService extends CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}

