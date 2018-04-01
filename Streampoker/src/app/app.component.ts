import { BusyService } from './services/busy.service';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NavigationHelperService } from './services/navigation-helper.service';
import { LoggingService } from './services/logging.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isInitialized: boolean;
  isBusy$: Observable<boolean>;

  constructor(
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
    this.userService.logout();
    this.busyService.setBusy(false);
  }
}
