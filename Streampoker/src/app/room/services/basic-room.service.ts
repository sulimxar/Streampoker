import { Injectable } from '@angular/core';
import { RoomService } from '@shared.module';

@Injectable()
export class BasicRoomService implements RoomService {

  constructor() { }

  createRoom(name: string): Promise<string> {
    return Promise.resolve<string>('rnkey');
  }

}
