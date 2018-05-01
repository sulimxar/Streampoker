import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export { ToggleBusyService } from './services/toggle.busy.service';
export { ConsoleLoggingService } from './services/console.logging.service';
export { RouterNavigationService } from './services/router.navigation.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent },
    ])
  ],
  declarations: [
    LoginComponent,
    NoAccessComponent
  ]
})
export class CoreModule { }
