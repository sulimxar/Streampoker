import { Component, Inject } from '@angular/core';
import { UserService, UserServiceInjectionToken } from '@shared.module';
import { Observable } from 'rxjs/Observable';
import { BusyService } from './services/busy.service';
import { NavigationHelperService } from './services/navigation-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isInitialized: boolean;
  isBusy$: Observable<boolean>;

  constructor(
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    private navigationHelper: NavigationHelperService,
    private busyService: BusyService
  ) {
    this.isBusy$ = this.busyService.isBusy$;
    this.busyService.setBusy(true);

    userService.whenInitialized.then(v => {
      this.isInitialized = true;
      navigationHelper.reloadCurrentRoute();
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
