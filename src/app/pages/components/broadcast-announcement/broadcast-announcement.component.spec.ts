import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastAnnouncementComponent } from './broadcast-announcement.component';

describe('BroadcastAnnouncementComponent', () => {
  let component: BroadcastAnnouncementComponent;
  let fixture: ComponentFixture<BroadcastAnnouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BroadcastAnnouncementComponent]
    });
    fixture = TestBed.createComponent(BroadcastAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
