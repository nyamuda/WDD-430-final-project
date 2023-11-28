import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialEditComponent } from './testimonial-edit.component';

describe('TestimonialEditComponent', () => {
  let component: TestimonialEditComponent;
  let fixture: ComponentFixture<TestimonialEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialEditComponent]
    });
    fixture = TestBed.createComponent(TestimonialEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
