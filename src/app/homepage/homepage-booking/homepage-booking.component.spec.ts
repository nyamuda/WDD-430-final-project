import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageBookingComponent } from './homepage-booking.component';

describe('HomepageBookingComponent', () => {
  let component: HomepageBookingComponent;
  let fixture: ComponentFixture<HomepageBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageBookingComponent]
    });
    fixture = TestBed.createComponent(HomepageBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
