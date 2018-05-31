import { Room } from '@shared.module';
import { Observable } from 'rxjs/Observable';

export interface RoomService {
    createRoom(name: string): Promise<string>;
}
