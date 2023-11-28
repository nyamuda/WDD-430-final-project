import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageTestimonialItemComponent } from './homepage-testimonial-item.component';

describe('HomepageTestimonialItemComponent', () => {
  let component: HomepageTestimonialItemComponent;
  let fixture: ComponentFixture<HomepageTestimonialItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageTestimonialItemComponent]
    });
    fixture = TestBed.createComponent(HomepageTestimonialItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
