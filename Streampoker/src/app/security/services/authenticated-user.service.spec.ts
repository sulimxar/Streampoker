import { TestBed, inject } from '@angular/core/testing';

import { AuthenticatedUserService } from '@security/services/authenticated-user.service';

describe('AuthenticatedUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticatedUserService]
    });
  });

  it('should be created', inject([AuthenticatedUserService], (service: AuthenticatedUserService) => {
    expect(service).toBeTruthy();
  }));
});
