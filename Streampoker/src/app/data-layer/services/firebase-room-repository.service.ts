import { Injectable } from '@angular/core';
import { RoomRepositoryService, Room, Guest } from '@shared.module';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { DataSnapshot } from '@firebase/database-types';

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

  getRoom(roomKey: string): Observable<Room> {
    return this.db.list('/rooms', ref => ref.orderByChild('key').equalTo(roomKey).limitToFirst(1))
    .snapshotChanges().map(
      r => {
        const snapshot = (r[0] as AngularFireAction<DataSnapshot>);
        const uid = snapshot.payload.key;
        const room = snapshot.payload.val();
        
        console.log('guest: ', room.guests);

        let guests: Guest[] = [];
        if (room.guests) {
          guests = (room.guests as any[])
          .map(v => {
            return new Guest(v.uid, v.name, v.mark, v.ping);
          });
        }

        return new Room(room.ownerId, uid, roomKey, room.name, guests);
      }
    );
  }
}
