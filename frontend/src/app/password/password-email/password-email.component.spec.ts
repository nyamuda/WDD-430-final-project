import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEmailComponent } from './password-email.component';

describe('PasswordEmailComponent', () => {
  let component: PasswordEmailComponent;
  let fixture: ComponentFixture<PasswordEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordEmailComponent]
    });
    fixture = TestBed.createComponent(PasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
