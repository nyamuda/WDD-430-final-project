import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAccountComponent } from './users-account.component';

describe('UsersAccountComponent', () => {
  let component: UsersAccountComponent;
  let fixture: ComponentFixture<UsersAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAccountComponent]
    });
    fixture = TestBed.createComponent(UsersAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
