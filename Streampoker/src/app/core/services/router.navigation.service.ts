import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '@shared.module';
import {PlatformLocation } from '@angular/common';

@Injectable()
export class RouterNavigationService implements NavigationService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platformLocation: PlatformLocation
  ) {
  }

  navigateToLogin(returnUrl: string) {
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
  }

  navigateToNewRoom(): void {
    this.router.navigate(['/new-room']);
  }

  navigateToRoom(roomKey: string): void {
    this.router.navigate(['/room/' + roomKey]);
  }

  returnFromLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigateByUrl(returnUrl);
  }

  reloadCurrentLocation() {
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }

  getCurrentUri(): string {
    return (this.platformLocation as any).location.href;
  }
}
