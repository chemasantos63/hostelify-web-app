import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateupdatepermanenceComponent } from './createupdatepermanence.component';

describe('CreateupdatepermanenceComponent', () => {
  let component: CreateupdatepermanenceComponent;
  let fixture: ComponentFixture<CreateupdatepermanenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateupdatepermanenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateupdatepermanenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
