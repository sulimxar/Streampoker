import { Inject, Injectable } from '@angular/core';
import { AppUser, AuthService, AuthServiceInjectionToken, 
  NavigationService, NavigationServiceInjectionToken, UserService } from '@shared.module';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticatedUserService implements UserService {

  private isAuthServiceInitialized: boolean;

  constructor(
    @Inject(AuthServiceInjectionToken)
    private authService: AuthService,
    private db: AngularFireDatabase,
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService
  ) {

  }

  logIn(loginName: string): Promise<boolean> {
    return this.authService.signIn().then(
      uid => {
        if (uid) {
          this.db.object('/users/' + uid).update({
            loginName: loginName
          });
          return true;
        }
        return false;
      });
  }

  logOut() {
    this.authService.signOut().then(r => {
      this.navigationService.navigateToLogin();
    });
  }

  get appUser$(): Observable<AppUser> {
    return this.authService.authState$
      .switchMap(uid => {
        if (uid) {
          return this.db.object('/users/' + uid).valueChanges().map(
            u => new AppUser(uid, (u as any).loginName));
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

    return this.authService.authState$.map(v => {
      this.isAuthServiceInitialized = true;
      return this.isInitialized;
    }).first().toPromise();
  }
}
