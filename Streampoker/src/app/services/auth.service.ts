import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthService {

  authState$: Observable<string>;

  constructor(private http: HttpClient,
    private afAuth: AngularFireAuth) {

    this.authState$ = afAuth.authState.map(s => s ? s.uid : null);
  }

  signIn(): Promise<string> {
    if (this.isAuthenticated) {
      return new Promise(() => this.currentUser.uid);
    }

    return this.afAuth.auth.signInAnonymously().then(
      user => {
        console.log('Authentication succeeded: ' + user.uid);
        return user ? user.uid : null;
      },
      error => {
        console.error('Authentication failed: ' + error);
        return null;
      });
  }

  signOut(): Promise<boolean> {
    return this.afAuth.auth.signOut();
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  private get currentUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }
}

