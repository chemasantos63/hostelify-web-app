import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateupdatefiscalinfoComponent } from './createupdatefiscalinfo.component';

describe('CreateupdatefiscalinfoComponent', () => {
  let component: CreateupdatefiscalinfoComponent;
  let fixture: ComponentFixture<CreateupdatefiscalinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateupdatefiscalinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateupdatefiscalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
