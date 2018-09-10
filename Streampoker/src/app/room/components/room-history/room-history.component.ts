import { Component, OnInit, Input } from '@angular/core';
import { AppUser, Room, History } from '@shared.module';

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

  get orderedHistory(): History[] {
    if (this.room && this.room.history) {
      return this.room.history.sort((a, b) => b.dateTime - a.dateTime);
    }

    return null;
  }
}
