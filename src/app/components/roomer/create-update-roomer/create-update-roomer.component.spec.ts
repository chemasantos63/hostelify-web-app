import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateRoomerComponent } from './create-update-roomer.component';

describe('CreateUpdateRoomerComponent', () => {
  let component: CreateUpdateRoomerComponent;
  let fixture: ComponentFixture<CreateUpdateRoomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateRoomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateRoomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
