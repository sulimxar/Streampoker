import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import {
  RoomService, RoomRepositoryServiceInjectionToken, RoomRepositoryService,
  UserServiceInjectionToken, UserService, Room, Guest, AppUser
} from '@shared.module';
import { Guid } from '@shared.module';

@Injectable()
export class BasicRoomService implements RoomService {

  private static readonly guestExpirationTimeout = 5000;

  constructor(
    @Inject(RoomRepositoryServiceInjectionToken)
    private roomRepositoryService: RoomRepositoryService,
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
  ) {

  }

  createRoom(roomName: string): Promise<string> {
    const ownerId = this.userService.appUser.uid;
    if (!ownerId) {
      throw new Error('Parameter ownerId cannot be null.');
    }

    const roomKey = this.generateRoomKey();

    return this.roomRepositoryService.addRoom(ownerId, roomKey, roomName).then<string>(uid => roomKey);
  }

  getRoom(roomKey: string): Observable<Room> {
    let rooms = this.roomRepositoryService.getRoomByKey(roomKey);

    rooms = rooms.map(room => {
      room.guests = room.guests.filter(v => {
        return (Date.now() - (v.ping as number)) < BasicRoomService.guestExpirationTimeout;
      });
      return room;
    });

    return rooms;
  }

  pingGuest(user: AppUser, room: Room): void {
    let guest = room.guests.find(g => g.uid === user.uid);

    if (guest) {
      guest.ping = Date.now();
    } else {
      guest = new Guest(user.uid, user.loginName, '?', Date.now());
      this.roomRepositoryService.updateRoomGuest(guest, room.uid);
    }

    this.roomRepositoryService.updateRoomGuestPing(guest, room.uid);
  }

  private generateRoomKey(): string {
    const guid = Guid.newGuid();
    const roomKey = guid.substring(0, 5).toUpperCase();
    return roomKey;
  }
}
