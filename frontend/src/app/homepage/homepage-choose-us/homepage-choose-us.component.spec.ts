import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageChooseUsComponent } from './homepage-choose-us.component';

describe('HomepageChooseUsComponent', () => {
  let component: HomepageChooseUsComponent;
  let fixture: ComponentFixture<HomepageChooseUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageChooseUsComponent]
    });
    fixture = TestBed.createComponent(HomepageChooseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
