import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAccountEditComponent } from './users-account-edit.component';

describe('UsersAccountEditComponent', () => {
  let component: UsersAccountEditComponent;
  let fixture: ComponentFixture<UsersAccountEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAccountEditComponent]
    });
    fixture = TestBed.createComponent(UsersAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
