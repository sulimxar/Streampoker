import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BusyService, BusyServiceInjectionToken, NavigationService, NavigationServiceInjectionToken,
  RoomService, RoomServiceInjectionToken, UserService, UserServiceInjectionToken
} from '@shared.module';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  roomKey: string;

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
    this.roomKey = this.route.snapshot.paramMap.get('key');
  }

  ngOnInit() {
  }

}
