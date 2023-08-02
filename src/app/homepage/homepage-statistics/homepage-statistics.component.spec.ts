import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageStatisticsComponent } from './homepage-statistics.component';

describe('HomepageStatisticsComponent', () => {
  let component: HomepageStatisticsComponent;
  let fixture: ComponentFixture<HomepageStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageStatisticsComponent]
    });
    fixture = TestBed.createComponent(HomepageStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
