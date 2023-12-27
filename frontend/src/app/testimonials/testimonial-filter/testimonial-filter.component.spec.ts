import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialFilterComponent } from './testimonial-filter.component';

describe('TestimonialFilterComponent', () => {
  let component: TestimonialFilterComponent;
  let fixture: ComponentFixture<TestimonialFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialFilterComponent]
    });
    fixture = TestBed.createComponent(TestimonialFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
