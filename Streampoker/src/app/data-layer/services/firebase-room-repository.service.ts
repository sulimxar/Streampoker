import { Injectable } from '@angular/core';
import { RoomRepositoryService, Room, Guest, Mark, History } from '@shared.module';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { DataSnapshot } from '@firebase/database-types';
import { HttpRequest } from 'selenium-webdriver/http';
import { forEach } from '@firebase/util';

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
          if (!snapshot) {
            return null;
          }
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

  updateRoomGuestMark(roomId: string, guestId: string, mark: string): void {
    this.updateRoomGuestPartially(guestId, roomId, {
      mark: mark
    });
  }

  updateRoomPing(ping: number, roomId: string): void {
    this.updateRoomPartially(roomId, {
      ping: ping
    });
  }

  addHistory(roomId: string, history: History): void {
    const properties = {
      summary: history.summary,
      marks: this.convertTypedMarksToFirebase(history.marks)
    };

    this.db.object('/rooms/' + roomId + '/history/' + history.dateTime).update(properties);
  }

  setSnapshot(roomId: string, snapshot: History): void {

    if (snapshot === null) {
      this.db.object('/rooms/' + roomId + '/snapshot').remove();
      return;
    }

    const properties = {
      dateTime: snapshot.dateTime,
      summary: snapshot.summary,
      marks: this.convertTypedMarksToFirebase(snapshot.marks)
    };

    this.db.object('/rooms/' + roomId + '/snapshot').update(properties);
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
          return new Guest(userId, g.name, g.mark, g.ping);
        });
    }

    let history: History[] = [];
    if (room.history) {

      history = Object.keys(room.history as any[])
        .map(historyTime => {
          const h = room.history[historyTime];
          const marks: Mark[] = this.convertFirebaseMarksToTyped(h.marks);

          return new History(h.summary, parseInt(historyTime, null), marks);
        });
    }

    let snapshot: History = null;
    if (room.snapshot) {
      const marks: Mark[] = this.convertFirebaseMarksToTyped(room.snapshot.marks);
      snapshot = new History(room.snapshot.summary, parseInt(room.snapshot.dateTime, null), marks);
    }


    return new Room(room.ownerId, roomId, room.key, room.name, room.ping, guests, snapshot, history);
  }

  private convertFirebaseMarksToTyped(marks: any): Mark[] {
    let result: Mark[] = [];
    if (marks) {
      result = Object.keys(marks as any[])
        .map(userId => {
          const m = marks[userId];
          return new Mark(userId, m.name, m.value);
        });
    }
    return result;
  }

  private convertTypedMarksToFirebase(marks: Mark[]): {} {
    const result = {};
    marks.forEach(m => result[m.uid] = {
      name: m.name,
      value: m.value
    });

    return result;
  }

}
