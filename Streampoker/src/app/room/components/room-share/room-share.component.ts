import { Component, OnInit, Input, Inject } from '@angular/core';
import { Room, NavigationServiceInjectionToken } from '@shared.module';
import { NavigationService } from 'app/shared/interfaces/navigation.service';

@Component({
  selector: 'app-room-share',
  templateUrl: './room-share.component.html',
  styleUrls: ['./room-share.component.scss']
})
export class RoomShareComponent implements OnInit {

  @Input() room: Room;
  @Input() buttonStyle: string;

  roomUri: string;
  isKeyCopied: boolean;
  isUriCopied: boolean;

  constructor(
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.roomUri = this.navigationService.getCurrentUri();
  }

  onLinkModalOpened() {
    this.isKeyCopied = false;
    this.isUriCopied = false;
  }
}
