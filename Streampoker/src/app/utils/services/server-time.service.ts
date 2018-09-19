import { Injectable } from '@angular/core';
import { TimeService } from '@shared.module';
//import * as firebase from 'firebase';

@Injectable()
export class ServerTimeService implements TimeService {

  constructor() { }

  now(): number {
    return Date.now();
  }

}
