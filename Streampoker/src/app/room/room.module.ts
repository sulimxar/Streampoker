import { FirebaseRoomRepositoryService } from '@data-layer.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserAuthGuardServiceInjectionToken, RoomRepositoryServiceInjectionToken, 
  RoomServiceInjectionToken, SharedModule } from '@shared.module';
import { HomeComponent } from './components/home/home.component';
import { NewRoomComponent } from './components/new-room/new-room.component';
import { RoomComponent } from './components/room/room.component';
import { BasicRoomService } from './services/basic-room.service';
import { RoomGuestComponent } from './components/room-guest/room-guest.component';
import { RoomAdminComponent } from './components/room-admin/room-admin.component';
import { RoomHeaderComponent } from './components/room-header/room-header.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    SharedModule,
    ClipboardModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, canActivate: [UserAuthGuardServiceInjectionToken] },
      { path: 'new-room', component: NewRoomComponent, canActivate: [UserAuthGuardServiceInjectionToken] },
      { path: 'room/:key', component: RoomComponent, canActivate: [UserAuthGuardServiceInjectionToken] }
    ])
  ],
  declarations: [
    RoomComponent,
    HomeComponent,
    NewRoomComponent,
    RoomGuestComponent,
    RoomAdminComponent,
    RoomHeaderComponent
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
