import { TestBed, inject } from '@angular/core/testing';

import { InteractiveUserAuthGuardService } from './interactive-user-auth-guard.service';

describe('UserAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteractiveUserAuthGuardService]
    });
  });

  it('should be created', inject([InteractiveUserAuthGuardService], (service: InteractiveUserAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
