import { Room, AppUser } from '@shared.module';
import { Observable } from 'rxjs/Observable';

export interface RoomService {
    createRoom(roomName: string): Promise<string>;
    getRoom(roomKey: string): Observable<Room>;
    pingGuest(user: AppUser, room: Room): void;
}
