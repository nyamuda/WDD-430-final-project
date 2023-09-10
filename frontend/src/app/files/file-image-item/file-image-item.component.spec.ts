import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImageItemComponent } from './file-image-item.component';

describe('FileImageItemComponent', () => {
  let component: FileImageItemComponent;
  let fixture: ComponentFixture<FileImageItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileImageItemComponent]
    });
    fixture = TestBed.createComponent(FileImageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
