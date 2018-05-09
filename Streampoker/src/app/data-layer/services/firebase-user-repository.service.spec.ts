import { TestBed, inject } from '@angular/core/testing';

import { FirebaseUserRepositoryService } from './firebase-user-repository.service';

describe('FirebaseUserRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseUserRepositoryService]
    });
  });

  it('should be created', inject([FirebaseUserRepositoryService], (service: FirebaseUserRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
