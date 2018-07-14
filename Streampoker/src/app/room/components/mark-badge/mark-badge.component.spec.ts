import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkBadgeComponent } from './mark-badge.component';

describe('MarkBadgeComponent', () => {
  let component: MarkBadgeComponent;
  let fixture: ComponentFixture<MarkBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
