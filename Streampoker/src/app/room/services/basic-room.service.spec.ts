import { TestBed, inject } from '@angular/core/testing';

import { BasicRoomService } from './basic-room.service';

describe('BasicRoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicRoomService]
    });
  });

  it('should be created', inject([BasicRoomService], (service: BasicRoomService) => {
    expect(service).toBeTruthy();
  }));
});
