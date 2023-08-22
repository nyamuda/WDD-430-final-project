import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAccountDetailsComponent } from './users-account-details.component';

describe('UsersAccountDetailsComponent', () => {
  let component: UsersAccountDetailsComponent;
  let fixture: ComponentFixture<UsersAccountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAccountDetailsComponent]
    });
    fixture = TestBed.createComponent(UsersAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
