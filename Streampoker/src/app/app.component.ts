import { Component, Inject } from '@angular/core';
import { BusyService, BusyServiceInjectionToken, NavigationService, 
  NavigationServiceInjectionToken, UserService, UserServiceInjectionToken } from '@shared.module';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isInitialized: boolean;
  isBusy$: Observable<boolean>;

  constructor(
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService,
    @Inject(BusyServiceInjectionToken)
    private busyService: BusyService
  ) {
    this.isBusy$ = this.busyService.isBusy$;
    this.busyService.setBusy(true);

    userService.whenInitialized.then(v => {
      this.isInitialized = true;
      navigationService.reloadCurrentLocation();
      this.busyService.setBusy(false);
    });
  }

  logout() {
    this.busyService.setBusy(true);
    this.userService.logOut();
    this.busyService.setBusy(false);
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
}
