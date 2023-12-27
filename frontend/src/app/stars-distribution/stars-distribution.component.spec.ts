import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsDistributionComponent } from './stars-distribution.component';

describe('StarsDistributionComponent', () => {
  let component: StarsDistributionComponent;
  let fixture: ComponentFixture<StarsDistributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarsDistributionComponent]
    });
    fixture = TestBed.createComponent(StarsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
