import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export { FirebaseUserRepositoryService } from './services/firebase-user-repository.service';
export { FirebaseRoomRepositoryService } from './services/firebase-room-repository.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class DataLayerModule { }
