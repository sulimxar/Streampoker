import { Room, AppUser, History, Guest } from '@shared.module';
import { Observable } from 'rxjs/Observable';

export interface RoomService {
    createRoom(roomName: string): Promise<string>;
    getRoom(roomKey: string): Observable<Room>;
    getRoomsByOwner(ownerId: string): Observable<Room[]>;
    pingGuest(user: AppUser, room: Room): void;
    resetGuest(room: Room, guest: Guest): void;
    voteGuest(room: Room, guest: Guest, mark: string): void;
    pingRoom(roomId: string): void;
    addHistory(roomId: string, history: History): void;
    setSnapshot(roomId: string, history: History): void;
}
