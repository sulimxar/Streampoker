import { Inject, Injectable } from '@angular/core';
import {
  AppUser, AuthService, AuthServiceInjectionToken, NavigationService,
  NavigationServiceInjectionToken, UserRepositoryService, UserRepositoryServiceInjectionToken,
  UserService
} from '@shared.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticatedUserService implements UserService {

  private isAuthServiceInitialized: boolean;
  private whenInitializedPromise: Promise<boolean>;

  constructor(
    @Inject(AuthServiceInjectionToken)
    private authService: AuthService,
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService,
    @Inject(UserRepositoryServiceInjectionToken)
    private userRepository: UserRepositoryService
  ) {
    this.whenInitializedPromise = this.authService.authState$.map(v => {
      this.isAuthServiceInitialized = true;
      return this.isInitialized;
    }).first().toPromise();
  }

  logIn(loginName: string): Promise<boolean> {
    return this.authService.signIn().then(
      uid => {
        if (uid) {
          this.userRepository.saveUser(new AppUser(uid, loginName));
          return true;
        }
        return false;
      });
  }

  logOut() {
    this.authService.signOut().then(r => {
      this.navigationService.navigateToLogin(null);
    });
  }

  get appUser$(): Observable<AppUser> {
    return this.authService.authState$
      .switchMap(uid => {
        if (uid) {
          return this.userRepository.getUser(uid);
        }

        return Observable.of(null);
      });
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  get isInitialized(): boolean {
    return this.isAuthServiceInitialized;
  }

  get whenInitialized(): Promise<boolean> {
    if (this.isInitialized) {
      return new Promise(v => true);
    }

    return this.whenInitializedPromise;
  }
}
