import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsStatisticsComponent } from './bookings-statistics.component';

describe('BookingsStatisticsComponent', () => {
  let component: BookingsStatisticsComponent;
  let fixture: ComponentFixture<BookingsStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsStatisticsComponent]
    });
    fixture = TestBed.createComponent(BookingsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
