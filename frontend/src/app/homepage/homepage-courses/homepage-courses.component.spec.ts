import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCoursesComponent } from './homepage-courses.component';

describe('HomepageCoursesComponent', () => {
  let component: HomepageCoursesComponent;
  let fixture: ComponentFixture<HomepageCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageCoursesComponent]
    });
    fixture = TestBed.createComponent(HomepageCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
