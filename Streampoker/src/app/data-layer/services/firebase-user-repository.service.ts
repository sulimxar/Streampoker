import { UserRepositoryService, AppUser } from '@shared.module';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseUserRepositoryService implements UserRepositoryService {

  constructor(private db: AngularFireDatabase) {
  }
  
  getUser(uid: string): Observable<AppUser> {
    return this.db.object('/users/' + uid).valueChanges().map(
      u => new AppUser(uid, (u as any).loginName));
  }

  saveUser(user: AppUser): Promise<void> {
    return this.db.object('/users/' + user.uid).update({
      loginName: user.loginName
    });
  }
}
