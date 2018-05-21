import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserAuthGuardServiceInjectionToken } from '@shared.module';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { NewRoomComponent } from './components/new-room/new-room.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, canActivate: [UserAuthGuardServiceInjectionToken] },
      { path: 'new-room', component: NewRoomComponent, canActivate: [UserAuthGuardServiceInjectionToken] }
    ])
  ],
  declarations: [
    RoomComponent,
    HomeComponent,
    NewRoomComponent
  ]
})
export class RoomModule { }
