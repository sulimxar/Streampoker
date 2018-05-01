import { TestBed, inject } from '@angular/core/testing';

import { RouterNavigationService } from './router.navigation.service';

describe('RouterNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterNavigationService]
    });
  });

  it('should be created', inject([RouterNavigationService], (service: RouterNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
