import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomerComponent } from './roomer.component';

describe('RoomerComponent', () => {
  let component: RoomerComponent;
  let fixture: ComponentFixture<RoomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
