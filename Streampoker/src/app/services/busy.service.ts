import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class BusyService {
  private isBusySubject: Subject<boolean>;
  isBusy$: Observable<boolean>;
  
  constructor() {
    this.isBusySubject = new BehaviorSubject(false);
    this.isBusy$ = this.isBusySubject.asObservable();
   }

  setBusy(isBusy: boolean) {
    this.isBusySubject.next(isBusy);
  }
}
