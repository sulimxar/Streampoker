import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomHistoryComponent } from './room-history.component';

describe('RoomHistoryComponent', () => {
  let component: RoomHistoryComponent;
  let fixture: ComponentFixture<RoomHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
