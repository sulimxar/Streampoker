import { FirebaseRoomRepositoryService } from '@data-layer.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserAuthGuardServiceInjectionToken, RoomRepositoryServiceInjectionToken, RoomServiceInjectionToken } from '@shared.module';
import { HomeComponent } from './components/home/home.component';
import { NewRoomComponent } from './components/new-room/new-room.component';
import { RoomComponent } from './components/room/room.component';
import { BasicRoomService } from './services/basic-room.service';

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
  ],
  providers: [
    {
      provide: RoomRepositoryServiceInjectionToken,
      useClass: FirebaseRoomRepositoryService
    },
    {
      provide: RoomServiceInjectionToken,
      useClass: BasicRoomService
    }
  ]
})
export class RoomModule { }
