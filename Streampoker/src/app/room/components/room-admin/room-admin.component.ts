import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { AppUser, Room, RoomServiceInjectionToken, RoomService } from '@shared.module';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-room-admin',
  templateUrl: './room-admin.component.html',
  styleUrls: ['./room-admin.component.scss']
})
export class RoomAdminComponent implements OnInit, OnDestroy {

  @Input() appUser: AppUser;
  @Input() room: Room;

  private pingSubscription: Subscription;

  constructor(
    @Inject(RoomServiceInjectionToken)
    private roomService: RoomService
  ) { }

  ngOnInit() {
    console.log('Admin componenty loaded');
    const timer = Observable.timer(10, 2000);
    this.pingSubscription = timer.subscribe(t => this.pingAdmin());
  }

  ngOnDestroy(): void {
    this.pingSubscription.unsubscribe();
  }

  private pingAdmin() {
    this.roomService.pingRoom(this.room.uid);
  }
}
