import { Injectable } from '@angular/core';
import { TimeService } from '@shared.module';
import * as firebase from 'firebase';
//import { AngularFireFunctions } from 'angularfire2/functions';
//import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable()
export class ServerTimeService implements TimeService {

  constructor() { }

  now(): number {
    //const ts = firebase.
    //console.log(ts);
    return Date.now();
  }

}
