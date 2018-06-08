import { Component, Inject, OnInit } from '@angular/core';
import { NavigationService, NavigationServiceInjectionToken } from '@shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private keyValueField: string;

  constructor(
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
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
