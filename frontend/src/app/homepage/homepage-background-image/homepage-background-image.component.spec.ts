import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageBackgroundImageComponent } from './homepage-background-image.component';

describe('HomepageBackgroundImageComponent', () => {
  let component: HomepageBackgroundImageComponent;
  let fixture: ComponentFixture<HomepageBackgroundImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageBackgroundImageComponent]
    });
    fixture = TestBed.createComponent(HomepageBackgroundImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
