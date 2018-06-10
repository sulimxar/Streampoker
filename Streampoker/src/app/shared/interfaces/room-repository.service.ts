import { Room, Guest } from '@shared.module';
import { Observable } from 'rxjs/Observable';

// tslint:disable-next-line:no-empty-interface
export interface RoomRepositoryService {
    addRoom(ownerId: string, key: string, name: string): Promise<string>;
    getRoomByKey(roomKey: string): Observable<Room>;
    getRoomById(uid: string): Observable<Room>;
    updateRoomGuest(guest: Guest, roomId: string): void;
    updateRoomGuestPing(guest: Guest, roomId: string): void;
}
