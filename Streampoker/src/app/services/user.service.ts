import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppUser } from '../models/appUser';
import { NavigationHelperService } from './navigation-helper.service';

@Injectable()
export class UserService {

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase,
    private navigationHelper: NavigationHelperService
  ) {

    }

  login(loginName: string): Promise<boolean> {
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

  logout() {
    this.authService.signOut().then(r => {
      this.navigationHelper.navigateToLogin();
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
}
