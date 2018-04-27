import { Component, Inject, OnDestroy } from '@angular/core';
import { UserService, UserServiceInjectionToken } from '@shared.module';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from '../models/appUser';
import { BusyService } from '../services/busy.service';
import { NavigationHelperService } from '../services/navigation-helper.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  appUser$: Observable<AppUser>;
  isInvalidLogin: boolean;
  isLoggingIn: boolean;
  userSubscription: Subscription;

  constructor(
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    private navigationHelper: NavigationHelperService,
    private busyService: BusyService
  ) {
    this.appUser$ = userService.appUser$;
    this.userSubscription = this.appUser$.subscribe(user => this.onUserChanged(user));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logIn(formData: any) {
    this.setLoginInProgress(true);
    this.userService.logIn(formData.login).then(result => {
      if (!result) {
        this.isInvalidLogin = true;
        this.setLoginInProgress(false);
      }
    },
      error => {
        this.isInvalidLogin = true;
        this.setLoginInProgress(false);
      });
  }

  private onUserChanged(user: AppUser): void {
    if (user) {
      this.navigationHelper.returnFromLogin();
      this.setLoginInProgress(false);
    }
  }

  private setLoginInProgress(isInProgress: boolean) {
    this.isLoggingIn = isInProgress;
    this.busyService.setBusy(isInProgress);
  }
}
