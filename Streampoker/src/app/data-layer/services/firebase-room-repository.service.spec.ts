import { TestBed, inject } from '@angular/core/testing';

import { FirebaseRoomRepositoryService } from './firebase-room-repository.service';

describe('FirebaseRoomRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseRoomRepositoryService]
    });
  });

  it('should be created', inject([FirebaseRoomRepositoryService], (service: FirebaseRoomRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
