import { Component, OnInit, Input } from '@angular/core';
import { AppUser, Room } from '@shared.module';

@Component({
  selector: 'app-room-history',
  templateUrl: './room-history.component.html',
  styleUrls: ['./room-history.component.scss']
})
export class RoomHistoryComponent implements OnInit {

  @Input() appUser: AppUser;
  @Input() room: Room;

  constructor() { }

  ngOnInit() {
  }

}
