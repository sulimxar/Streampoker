import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAdminComponent } from './room-admin.component';

describe('RoomAdminComponent', () => {
  let component: RoomAdminComponent;
  let fixture: ComponentFixture<RoomAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
