import { Component, Inject, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BusyService, BusyServiceInjectionToken, NavigationService, NavigationServiceInjectionToken,
  RoomService, RoomServiceInjectionToken, UserService, UserServiceInjectionToken, Room, AppUser
} from '@shared.module';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  roomKey: string;
  room$: Observable<Room>;
  appUser: AppUser;
  isRoomNotFound: boolean;

  constructor(
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    @Inject(RoomServiceInjectionToken)
    private roomService: RoomService,
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService,
    @Inject(BusyServiceInjectionToken)
    private busyService: BusyService,
    private route: ActivatedRoute,
  ) {
    this.roomKey = this.route.snapshot.paramMap.get('key').toUpperCase();
  }

  ngOnInit() {
    this.busyService.setBusy(true);
    this.room$ = this.roomService.getRoom(this.roomKey);

    this.userService.appUser$.take(1).subscribe(u => {
      this.appUser = u;
      this.room$.take(1).subscribe(room => {
        if (!room) {
          this.isRoomNotFound = true;
        }

        this.busyService.setBusy(false);
      });
    });
  }

  onGoHomeClicked() {
    this.navigationService.navigateToHome();
  }

}
