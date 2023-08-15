import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPaginationComponent } from './review-pagination.component';

describe('ReviewPaginationComponent', () => {
  let component: ReviewPaginationComponent;
  let fixture: ComponentFixture<ReviewPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewPaginationComponent]
    });
    fixture = TestBed.createComponent(ReviewPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
