import { NavigationService, NavigationServiceInjectionToken } from '@shared.module';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    @Inject(NavigationServiceInjectionToken)
    private navigationService: NavigationService,
  ) { }

  ngOnInit() {
  }

  goToRoom(formGoToRoom) {
    console.log(formGoToRoom);
  }

  newRoom() {
    this.navigationService.navigateToNewRoom();
  }
}
