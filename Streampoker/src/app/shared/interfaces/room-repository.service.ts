import { Room, Guest } from '@shared.module';
import { Observable } from 'rxjs/Observable';

export interface RoomRepositoryService {
    addRoom(ownerId: string, key: string, name: string): Promise<string>;
    getRoomByKey(roomKey: string): Observable<Room>;
    getRoomById(uid: string): Observable<Room>;
    getRoomsByOwner(ownerId: string): Observable<Room[]>;
    updateRoomGuest(guest: Guest, roomId: string): void;
    updateRoomGuestPing(guest: Guest, roomId: string): void;
    updateRoomPing(ping: number, roomId: string): void;
}
