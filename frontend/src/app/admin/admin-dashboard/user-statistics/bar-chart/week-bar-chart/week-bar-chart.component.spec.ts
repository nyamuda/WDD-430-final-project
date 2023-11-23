import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekBarChartComponent } from './week-bar-chart.component';

describe('WeekBarChartComponent', () => {
  let component: WeekBarChartComponent;
  let fixture: ComponentFixture<WeekBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekBarChartComponent]
    });
    fixture = TestBed.createComponent(WeekBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
