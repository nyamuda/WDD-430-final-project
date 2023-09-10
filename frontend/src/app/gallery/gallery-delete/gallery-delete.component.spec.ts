import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDeleteComponent } from './gallery-delete.component';

describe('GalleryDeleteComponent', () => {
  let component: GalleryDeleteComponent;
  let fixture: ComponentFixture<GalleryDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryDeleteComponent]
    });
    fixture = TestBed.createComponent(GalleryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
