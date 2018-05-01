import { Observable } from 'rxjs/Observable';

export interface AuthService {

    readonly isAuthenticated: boolean;

    authState$: Observable<string>;

    signIn(): Promise<string>;

    signOut(): Promise<boolean>;
}
