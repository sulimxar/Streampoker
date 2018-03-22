import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NavigationHelperService } from './services/navigation-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isInitialized: boolean;

  constructor(
    private userService: UserService,
    private navigationHelper: NavigationHelperService
  ) {
    userService.whenInitialized.then(v => {
      this.isInitialized = true;
      navigationHelper.reloadCurrentRoute();
    });
  }

  logout() {
    this.userService.logout();
  }
}
