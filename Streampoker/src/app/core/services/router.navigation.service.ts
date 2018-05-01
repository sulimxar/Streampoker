import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '@shared.module';

@Injectable()
export class RouterNavigationService implements NavigationService {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
   }

   navigateToLogin() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.route.snapshot.url }});
   }

   returnFromLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigateByUrl(returnUrl);
   }

   reloadCurrentLocation() {
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
   }
}
