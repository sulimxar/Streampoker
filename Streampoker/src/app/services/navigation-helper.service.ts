import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class NavigationHelperService {

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
}
