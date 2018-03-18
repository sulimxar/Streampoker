import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/appUser';
import { Subscription } from 'rxjs/Subscription';
import { NavigationHelperService } from '../services/navigation-helper.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  appUser$: Observable<AppUser>;
  invalidLogin: boolean;
  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private navigationHelper: NavigationHelperService
  ) {
    this.appUser$ = userService.appUser$;
    this.userSubscription = this.appUser$.subscribe(user => this.onUserChanged(user));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  signIn(formData: any) {
    this.userService.login(formData.login).then(result => {
      if (!result) {
        this.invalidLogin = true;
      }
    },
      error => {
        this.invalidLogin = true;
      });
  }

  private onUserChanged(user: AppUser): void {
    if (user) {
      this.navigationHelper.returnFromLogin();
    }
  }
}
