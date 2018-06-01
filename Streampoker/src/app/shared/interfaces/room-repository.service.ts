import { Room } from '@shared.module';
import { Observable } from 'rxjs/Observable';

// tslint:disable-next-line:no-empty-interface
export interface RoomRepositoryService {
    addRoom(ownerId: string, key: string, name: string): Promise<string>;
}
