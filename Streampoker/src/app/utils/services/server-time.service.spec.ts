import { TestBed, inject } from '@angular/core/testing';

import { ServerTimeService } from './server-time.service';

describe('ServerTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerTimeService]
    });
  });

  it('should be created', inject([ServerTimeService], (service: ServerTimeService) => {
    expect(service).toBeTruthy();
  }));
});
