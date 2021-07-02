import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateupdaterolesComponent } from './createupdateroles.component';

describe('CreateupdaterolesComponent', () => {
  let component: CreateupdaterolesComponent;
  let fixture: ComponentFixture<CreateupdaterolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateupdaterolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateupdaterolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
