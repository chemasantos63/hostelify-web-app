import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateupdateuserComponent } from './createupdateuser.component';

describe('CreateupdateuserComponent', () => {
  let component: CreateupdateuserComponent;
  let fixture: ComponentFixture<CreateupdateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateupdateuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateupdateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
