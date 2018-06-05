import { Component, Inject, OnDestroy } from '@angular/core';
import { BusyService, BusyServiceInjectionToken, NavigationService, 
  NavigationServiceInjectionToken, UserService, UserServiceInjectionToken, AppUser } from '@shared.module';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  isInitialized: boolean;
  isBusy$: Observable<boolean>;
  appUser: AppUser;
  userSubscription: Subscription;

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
    this.userSubscription = this.userService.appUser$.subscribe(user => this.onUserChanged(user));

    userService.whenInitialized.then(v => {
      this.isInitialized = true;
      this.busyService.setBusy(false);
    });
  }

  private onUserChanged(user: AppUser): void {
    this.appUser = user;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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
