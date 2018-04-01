import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() { }

  info(message: string) {
    console.log(message);
  }

  error(message: string) {
    (console.error || console.log)(message);
  }

  warning(message: string) {
    (console.warn || console.log)(message);
  }
}
