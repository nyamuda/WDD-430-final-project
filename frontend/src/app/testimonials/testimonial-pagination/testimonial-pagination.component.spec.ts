import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialPaginationComponent } from './testimonial-pagination.component';

describe('TestimonialPaginationComponent', () => {
  let component: TestimonialPaginationComponent;
  let fixture: ComponentFixture<TestimonialPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialPaginationComponent]
    });
    fixture = TestBed.createComponent(TestimonialPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
