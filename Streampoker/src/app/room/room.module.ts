import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserAuthGuardServiceInjectionToken } from '@shared.module';
import { HomeComponent } from './components/home/home.component';
import { NewRoomComponent } from './components/new-room/new-room.component';
import { RoomComponent } from './components/room/room.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, canActivate: [UserAuthGuardServiceInjectionToken] },
      { path: 'new-room', component: NewRoomComponent, canActivate: [UserAuthGuardServiceInjectionToken] },
      { path: 'room', component: RoomComponent }
    ])
  ],
  declarations: [
    RoomComponent,
    HomeComponent,
    NewRoomComponent
  ]
})
export class RoomModule { }
