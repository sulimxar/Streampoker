import { Room } from '@shared.module';
import { Observable } from 'rxjs/Observable';

export interface RoomRepositoryService {
    createRoom(name: string): Promise<string>;
}
