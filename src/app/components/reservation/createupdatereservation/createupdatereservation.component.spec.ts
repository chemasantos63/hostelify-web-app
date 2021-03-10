import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateupdatereservationComponent } from './createupdatereservation.component';

describe('CreateupdatereservationComponent', () => {
  let component: CreateupdatereservationComponent;
  let fixture: ComponentFixture<CreateupdatereservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateupdatereservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateupdatereservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
