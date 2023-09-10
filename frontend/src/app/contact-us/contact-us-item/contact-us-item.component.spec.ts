import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsItemComponent } from './contact-us-item.component';

describe('ContactUsItemComponent', () => {
  let component: ContactUsItemComponent;
  let fixture: ComponentFixture<ContactUsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsItemComponent]
    });
    fixture = TestBed.createComponent(ContactUsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
