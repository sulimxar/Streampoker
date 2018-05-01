import { TestBed, inject } from '@angular/core/testing';

import { ToggleBusyService } from './toggle.busy.service';

describe('ToggleBusyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToggleBusyService]
    });
  });

  it('should be created', inject([ToggleBusyService], (service: ToggleBusyService) => {
    expect(service).toBeTruthy();
  }));
});
