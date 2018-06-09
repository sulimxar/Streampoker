import { Component, OnInit, Input } from '@angular/core';
import { AppUser, Room } from '@shared.module';

@Component({
  selector: 'app-room-admin',
  templateUrl: './room-admin.component.html',
  styleUrls: ['./room-admin.component.scss']
})
export class RoomAdminComponent implements OnInit {

  @Input() appUser: AppUser;
  @Input() room: Room;
  
  constructor() { }

  ngOnInit() {
    console.log('Admin componenty loaded');
  }

}
