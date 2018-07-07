import { Room, Guest, History } from '@shared.module';
import { Observable } from 'rxjs/Observable';

export interface RoomRepositoryService {
    addRoom(ownerId: string, key: string, name: string): Promise<string>;
    getRoomByKey(roomKey: string): Observable<Room>;
    getRoomById(uid: string): Observable<Room>;
    getRoomsByOwner(ownerId: string): Observable<Room[]>;
    updateRoomGuest(guest: Guest, roomId: string): void;
    updateRoomGuestPing(guest: Guest, roomId: string): void;
    updateRoomGuestMark(roomId: string, guestId: string, mark: string);
    updateRoomPing(ping: number, roomId: string): void;
    addHistory(roomId: string, history: History): void;
    setSnapshot(roomId: string, history: History): void;
}
