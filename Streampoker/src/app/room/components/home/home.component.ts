import { Component, Inject, OnInit } from '@angular/core';
import {
  NavigationService, NavigationServiceInjectionToken, UserServiceInjectionToken,
  UserService, RoomServiceInjectionToken, RoomService, BusyServiceInjectionToken, BusyService, Room, AppUser
} from '@shared.module';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private keyValueField: string;

  rooms$: Observable<Room[]>;
  appUser: AppUser;

  constructor(
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    @Inject(RoomServiceInjectionToken)
    private roomService: RoomService,
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService,
    @Inject(BusyServiceInjectionToken)
    private busyService: BusyService
  ) { }

  ngOnInit() {
    this.busyService.setBusy(true);

    this.userService.appUser$.take(1).subscribe(u => {
      this.appUser = u;
      this.rooms$ = this.roomService.getRoomsByOwner(this.appUser.uid);
      this.rooms$.take(1).subscribe(r => {
        console.log('rooms received: ', r);
        this.busyService.setBusy(false);
      });
    });
  }

  goToRoom(formGoToRoom) {
    this.navigationService.navigateToRoom(formGoToRoom.roomKey);
  }

  newRoom() {
    this.navigationService.navigateToNewRoom();
  }

  set keyValue(value: string) {
    this.keyValueField = value.toUpperCase();
  }

  get keyValue(): string {
    return this.keyValueField;
  }
}
