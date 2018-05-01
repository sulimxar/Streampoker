import { LoggingService } from '@shared.module';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsoleLoggingService implements LoggingService {

  constructor() { }

  info(message: string): void {
    console.log(message);
  }

  error(message: string): void {
    (console.error || console.log)(message);
  }

  warning(message: string): void {
    (console.warn || console.log)(message);
  }
}
