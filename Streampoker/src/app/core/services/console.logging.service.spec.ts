import { TestBed, inject } from '@angular/core/testing';

import { ConsoleLoggingService } from './console.logging.service';

describe('ConsoleLoggingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsoleLoggingService]
    });
  });

  it('should be created', inject([ConsoleLoggingService], (service: ConsoleLoggingService) => {
    expect(service).toBeTruthy();
  }));
});
