import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import {
  RoomService, RoomRepositoryServiceInjectionToken, RoomRepositoryService,
  UserServiceInjectionToken, UserService, Room, Guest, AppUser, History, TimeService, TimeServiceInjectionToken
} from '@shared.module';
import { Guid } from '@utils.module';

@Injectable()
export class BasicRoomService implements RoomService {

  private static readonly guestExpirationTimeout = 10000;

  constructor(
    @Inject(RoomRepositoryServiceInjectionToken)
    private roomRepositoryService: RoomRepositoryService,
    @Inject(UserServiceInjectionToken)
    private userService: UserService,
    @Inject(TimeServiceInjectionToken)
    private timeService: TimeService,
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
    let room$ = this.roomRepositoryService.getRoomByKey(roomKey);

    room$ = room$.map(room => room ? this.filterAliveGuests(room) : null);

    return room$;
  }

  getRoomsByOwner(ownerId: string): Observable<Room[]> {
    return this.roomRepositoryService.getRoomsByOwner(ownerId).map(rooms => 
      rooms.map(room => this.filterAliveGuests(room)));
  }

  pingGuest(user: AppUser, room: Room): void {
    let guest = room.guests.find(g => g.uid === user.uid);

    if (guest) {
      guest.ping = room.ping;
    } else {
      guest = new Guest(user.uid, user.loginName, ' ', room.ping);
      this.roomRepositoryService.updateRoomGuest(guest, room.uid);
    }

    this.roomRepositoryService.updateRoomGuestPing(guest, room.uid);
  }

  resetGuest(room: Room, guest: Guest): void {
    this.roomRepositoryService.updateRoomGuestMark(room.uid, guest.uid, ' ');
  }

  voteGuest(room: Room, guest: Guest, mark: string): void {
    this.roomRepositoryService.updateRoomGuestMark(room.uid, guest.uid, mark);
  }

  pingRoom(roomId: string): void {
    this.roomRepositoryService.updateRoomPing(this.timeService.now(), roomId);
  }

  addHistory(roomId: string, history: History): void {
    this.roomRepositoryService.addHistory(roomId, history);
  }

  setSnapshot(roomId: string, history: History): void {
    this.roomRepositoryService.setSnapshot(roomId, history);
  }

  private filterAliveGuests(room: Room): Room {
    const now = room.ping;
    room.guests = room.guests.filter(g => {
      return g.mark !== ' ' || (now - (g.ping as number)) < BasicRoomService.guestExpirationTimeout;
    });
    return room;
  }

  private generateRoomKey(): string {
    const guid = Guid.newGuid();
    const roomKey = guid.substring(0, 5).toUpperCase();
    return roomKey;
  }
}
