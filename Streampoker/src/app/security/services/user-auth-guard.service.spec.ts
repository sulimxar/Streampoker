import { TestBed, inject } from '@angular/core/testing';

import { UserAuthGuard } from './user-auth-guard.service';

describe('UserAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthGuard]
    });
  });

  it('should be created', inject([UserAuthGuard], (service: UserAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
