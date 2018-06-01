import { Injectable } from '@angular/core';
import { RoomRepositoryService } from '@shared.module';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseRoomRepositoryService implements RoomRepositoryService {

  constructor(private db: AngularFireDatabase) { }

  addRoom(ownerId: string, key: string, name: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.db.list('/rooms').push({
        ownerId: ownerId,
        key: key,
        name: name
      }).then(v => {
        resolve(v.key);
      });
    });
  }
}
