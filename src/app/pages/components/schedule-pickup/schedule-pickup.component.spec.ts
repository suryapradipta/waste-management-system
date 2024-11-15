import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePickupComponent } from './schedule-pickup.component';

describe('SchedulePickupComponent', () => {
  let component: SchedulePickupComponent;
  let fixture: ComponentFixture<SchedulePickupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulePickupComponent]
    });
    fixture = TestBed.createComponent(SchedulePickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
