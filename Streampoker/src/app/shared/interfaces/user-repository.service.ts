import { AppUser } from '@shared.module';
import { Observable } from 'rxjs/Observable';

export interface UserRepositoryService {
    getUser(uid: string): Observable<AppUser>;
    saveUser(user: AppUser): Promise<void>;
}
