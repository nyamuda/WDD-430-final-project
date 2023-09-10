import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAddComponent } from './gallery-add.component';

describe('GalleryAddComponent', () => {
  let component: GalleryAddComponent;
  let fixture: ComponentFixture<GalleryAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryAddComponent]
    });
    fixture = TestBed.createComponent(GalleryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
