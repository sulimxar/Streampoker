import { NavigationService, NavigationServiceInjectionToken } from '@shared.module';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ValueEventRegistration } from '@firebase/database/dist/esm/src/core/view/EventRegistration';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private keyValueField: string;

  constructor(
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  goToRoom(formGoToRoom) {
    console.log(formGoToRoom);
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
