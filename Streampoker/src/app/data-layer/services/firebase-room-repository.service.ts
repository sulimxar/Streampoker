import { Injectable } from '@angular/core';
import { RoomRepositoryService, Room, Guest, Mark, History } from '@shared.module';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { DataSnapshot } from '@firebase/database-types';
import { HttpRequest } from 'selenium-webdriver/http';

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

  getRoomByKey(roomKey: string): Observable<Room> {
    return this.db.list('/rooms', ref => ref.orderByChild('key').equalTo(roomKey).limitToFirst(1))
      .snapshotChanges().map(
        r => {
          const snapshot = (r[0] as AngularFireAction<DataSnapshot>);
          const roomId = snapshot.payload.key;
          const room = snapshot.payload.val();
          return this.convertFirebaseRoom(roomId, room);
        }
      );
  }

  getRoomById(roomId: string): Observable<Room> {
    return this.db.object('/rooms/' + roomId)
      .valueChanges().map(
        r => {
          const room = r as any;
          return this.convertFirebaseRoom(roomId, room);
        }
      );
  }

  getRoomsByOwner(ownerId: string): Observable<Room[]> {
    return this.db.list('/rooms', ref => ref.orderByChild('ownerId').equalTo(ownerId))
      .snapshotChanges().map(
        list => {
          return list.map(r => {
            const snapshot = r as AngularFireAction<DataSnapshot>;
            const roomId = snapshot.payload.key;
            const room = snapshot.payload.val();
            return this.convertFirebaseRoom(roomId, room);
          });
        }
      );
  }

  updateRoomGuest(guest: Guest, roomId: string): void {
    this.updateRoomGuestPartially(guest.uid, roomId, {
      name: guest.name,
      mark: guest.mark,
      ping: guest.ping
    });
  }

  updateRoomGuestPing(guest: Guest, roomId: string): void {
    this.updateRoomGuestPartially(guest.uid, roomId, {
      ping: guest.ping
    });
  }

  updateRoomPing(ping: number, roomId: string): void {
    this.updateRoomPartially(roomId, {
      ping: ping
    });
  }

  private updateRoomGuestPartially(guestId: string, roomId: string, properties: {}): void {
    this.db.object('/rooms/' + roomId + '/guests/' + guestId).update(properties);
  }

  private updateRoomPartially(roomId: string, properties: {}): void {
    this.db.object('/rooms/' + roomId).update(properties);
  }

  private convertFirebaseRoom(roomId: string, room: any): Room {
    let guests: Guest[] = [];
    if (room.guests) {
      guests = Object.keys(room.guests as any[])
        .map(userId => {
          const g = room.guests[userId];
          return new Guest(g.uid, g.name, g.mark, g.ping);
        });
    }

    let history: History = null;
    if (room.history) {
      let marks: Mark[] = [];

      if (room.history.marks) {
        marks = (room.history.marks as any[])
        .map(m => {
          return new Mark(m.uid, m.name, m.value);
        });
      }

      history = new History(room.History.Summary, marks);
    }

    return new Room(room.ownerId, roomId, room.key, room.name, room.ping, guests, history);
  }
}
