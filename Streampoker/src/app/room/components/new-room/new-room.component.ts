import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { BusyService, BusyServiceInjectionToken, NavigationService, 
  NavigationServiceInjectionToken, UserService, UserServiceInjectionToken, AppUser } from '@shared.module';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit, OnDestroy {

  private currentUser: AppUser;
  private userSubscribtion: Subscription;

  constructor(
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService,
    @Inject(BusyServiceInjectionToken)
    private busyService: BusyService
  ) { }

  ngOnInit() {
    this.userSubscribtion = this.userService.appUser$.subscribe(this.onUserChanged);
  }

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
  }

  private onUserChanged(user: AppUser): void {
    this.currentUser = user;

    if (!this.currentUser) {
      // If user is not set - reload the current view to reapply security policies
      this.navigationService.reloadCurrentLocation();
    }

    console.log('User changed: ', user);
  }

  createRoom(formNewRoom) {
    this.busyService.setBusy(true);
    console.log(formNewRoom);
    //this.currentUser.
    this.busyService.setBusy(false);
    this.navigationService.navigateToRoom(formNewRoom.roomName);
  }
}
