import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryLoaderComponent } from './gallery-loader.component';

describe('GalleryLoaderComponent', () => {
  let component: GalleryLoaderComponent;
  let fixture: ComponentFixture<GalleryLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryLoaderComponent]
    });
    fixture = TestBed.createComponent(GalleryLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
