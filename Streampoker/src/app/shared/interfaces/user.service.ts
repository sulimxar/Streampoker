import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/appUser';

export interface UserService {
    readonly appUser$: Observable<AppUser>;
    readonly appUser: AppUser;
    readonly isLoggedIn: boolean;
    readonly isInitialized: boolean;
    readonly whenInitialized: Promise<boolean>;

    logIn(loginName: string): Promise<boolean>;
    logOut();
}
