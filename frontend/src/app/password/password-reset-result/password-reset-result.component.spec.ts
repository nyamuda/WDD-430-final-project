import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetResultComponent } from './password-reset-result.component';

describe('PasswordResetResultComponent', () => {
  let component: PasswordResetResultComponent;
  let fixture: ComponentFixture<PasswordResetResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetResultComponent]
    });
    fixture = TestBed.createComponent(PasswordResetResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
