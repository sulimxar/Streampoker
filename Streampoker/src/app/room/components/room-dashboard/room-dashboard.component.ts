import { Component, OnInit, Input } from '@angular/core';
import { AppUser, Room } from '@shared.module';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss']
})
export class RoomDashboardComponent implements OnInit {

  @Input() appUser: AppUser;
  @Input() room: Room;

  constructor() { }

  ngOnInit() {
  }

}
