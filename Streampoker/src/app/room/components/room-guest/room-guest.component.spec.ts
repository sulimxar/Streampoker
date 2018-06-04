import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomGuestComponent } from './room-guest.component';

describe('RoomGuestComponent', () => {
  let component: RoomGuestComponent;
  let fixture: ComponentFixture<RoomGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
