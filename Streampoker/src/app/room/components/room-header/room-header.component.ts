import { AppUser, Room } from '@shared.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-room-header',
  templateUrl: './room-header.component.html',
  styleUrls: ['./room-header.component.scss']
})
export class RoomHeaderComponent implements OnInit {

  @Input() appUser: AppUser;
  @Input() room: Room;

  constructor() { }

  ngOnInit() {
  }

}
