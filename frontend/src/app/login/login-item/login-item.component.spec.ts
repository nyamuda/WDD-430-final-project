import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginItemComponent } from './login-item.component';

describe('LoginItemComponent', () => {
  let component: LoginItemComponent;
  let fixture: ComponentFixture<LoginItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginItemComponent]
    });
    fixture = TestBed.createComponent(LoginItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
